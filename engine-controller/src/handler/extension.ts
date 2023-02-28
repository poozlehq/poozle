/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as k8s from '@kubernetes/client-node';
import { Request, Response } from 'express';
import { Logger } from 'winston';

import {
  Extension,
  ExtensionEventEnum,
  ExtensionRequestBody,
  Namespace,
  Workspace,
} from '../modules';

const INTEGRATIONS_NAMESPACE = 'engine-integrations';

export function extensionHandler(logger: Logger) {
  return async (req: Request, res: Response) => {
    const body = req.body as ExtensionRequestBody;

    // Generates a client from an existing kubeconfig whether in memory
    // or from a file.
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);

    const namespace = new Namespace(INTEGRATIONS_NAMESPACE, k8sApiCore, logger);
    /* 
      This will create the engine-integrations namespace if not present
      in which all the integration pods will go into
    */
    await namespace.createIfNotExist();

    /* 
      We will start the check for workspace gateways
    */
    const extension = new Extension(
      k8sApi,
      k8sApiCore,
      body.slug,
      INTEGRATIONS_NAMESPACE,
      logger,
    );

    const workspace = new Workspace(
      k8sApi,
      k8sApiCore,
      body.workspaceSlug,
      'engine-gateway',
      logger,
    );

    switch (body.event) {
      case ExtensionEventEnum.CREATE: {
        /* 
          This will create a deployment for the extension 
          if not found
        */
        const createStatus = await extension.startCreate({
          containers: [
            {
              image: body.dockerImage,
              name: body.slug,
            },
          ],
        });
        res.status(createStatus.status ? 200 : 400).json(createStatus);

        /**
         * Restart the engine-gateway deployment for this workspace
         */
        await workspace.restartDeployment();
        break;
      }
      case ExtensionEventEnum.DELETE: {
        /* 
          This will delete all the resources related to the extension
        */
        const deleteStatus = await extension.startDelete();
        res.status(deleteStatus.status ? 200 : 400).json(deleteStatus);

        /**
         * Restart the engine-gateway deployment for this workspace
         */
        await workspace.restartDeployment();
        break;
      }
      case ExtensionEventEnum.STATUS: {
        const deploymentStatus = await extension.getDeployment();
        res.status(deploymentStatus.status ? 200 : 400).json(deploymentStatus);
        break;
      }
    }
  };
}

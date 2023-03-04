/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as k8s from '@kubernetes/client-node';
import { Request, Response } from 'express';
import { Logger } from 'winston';

import {
  Namespace,
  Workspace,
  WorkspaceEventEnum,
  WorkspaceRequestBody,
} from '../modules';
import { Container } from '../utils';

const deploymentSpec = {
  containers: [
    {
      image: 'manoj67/engine-gateway:latest',
      name: 'gateway',
    },
  ],
};

const port = 4000;

export function workspaceHandler(logger: Logger) {
  return async (req: Request, res: Response) => {
    const body = req.body as WorkspaceRequestBody;

    // Generates a client from an existing kubeconfig whether in memory
    // or from a file.
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);

    const namespace = new Namespace('engine-gateway', k8sApiCore, logger);
    /* 
      This will create the engine-gateway namespace if not present
      in which all the gateway pods will go into
    */
    await namespace.createIfNotExist();

    /* 
      We will start the check for workspace gateways
    */
    const workspace = new Workspace(
      k8sApi,
      k8sApiCore,
      body.slug,
      'engine-gateway',
      logger,
      port
    );

    deploymentSpec.containers.map((container: Container) => {
      container.env = [{ 'name': 'WORKSPACE_ID', 'value': body.workspaceId }]
    })

    switch (body.event) {
      case WorkspaceEventEnum.CREATE: {
        /* 
          This will create a gateway deployment for the workspace 
          if not found
        */
        const createStatus = await workspace.startCreate(deploymentSpec);
        res.status(createStatus.status ? 200 : 400).json(createStatus);
        break;
      }
      case WorkspaceEventEnum.DELETE: {
        /* 
          Deleting the deployment and service for the workspace
        */
        const deleteStatus = await workspace.startDelete();
        res.status(deleteStatus.status ? 200 : 400).json(deleteStatus);
        break;
      }
      case WorkspaceEventEnum.RESTART: {
        /* 
          This will create a new engine-gateway pods with the new credentials
        */
        const restartStatus = await workspace.restartDeployment();
        res.status(restartStatus.status ? 200 : 400).json(restartStatus);
        break;
      }
      case WorkspaceEventEnum.STATUS: {
        /* 
          This will get pods status of new gateway
        */
        const deploymentStatus = await workspace.getDeployment();
        res.status(deploymentStatus.status ? 200 : 400).json(deploymentStatus);
        break;
      }
      default: {
        logger.info('No event was configured for this');
      }
    }
  };
}

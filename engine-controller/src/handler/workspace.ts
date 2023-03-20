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
      image: `poozlehq/engine-gateway:${process.env.ENGINE_VERSION}`,
      name: 'gateway',
    },
  ],
};

const ingressName = process.env.INGRESS_NAME

const port = 4000;
// TODO: Move this to env
const annotations = {
  'beta.cloud.google.com/backend-config': '{"default": "gateway-config"}',
  'networking.gke.io/load-balancer-type': 'Internal',
};

export function workspaceHandler(logger: Logger) {
  return async (req: Request, res: Response) => {
    const body = req.body as WorkspaceRequestBody;

    // Generates a client from an existing kubeconfig whether in memory
    // or from a file.
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);

    const namespace = new Namespace('engine', k8sApiCore, logger);
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
      k8sNetworkingV1Api,
      body.slug,
      'engine',
      logger,
      port,
      annotations,
    );

    deploymentSpec.containers.map((container: Container) => {
      container.env = [
        { name: 'WORKSPACE_ID', value: body.workspaceId },
        { name: 'DATABASE_URL', value: process.env.DATABASE_URL },
        { name: 'JWT_SECRET', value: process.env.JWT_ACCESS_SECRET },
        { name: 'REDIS_URL', value: process.env.REDIS_URL },
      ];
    });

    logger.info(`body event ${body.event}`);
    switch (body.event) {
      case WorkspaceEventEnum.CREATE: {
        /* 
          This will create a gateway deployment for the workspace 
          if not found
        */
        const createStatus = await workspace.startCreate(deploymentSpec);
        const ingressStatus = await workspace.updateIngress(ingressName, 'CREATE');
        res.status(createStatus.status && ingressStatus.status ? 200 : 400).json(ingressStatus);
        break;
      }
      case WorkspaceEventEnum.DELETE: {
        /* 
          Deleting the deployment and service for the workspace
        */
        const deleteStatus = await workspace.startDelete();
        const ingressStatus = await workspace.updateIngress(ingressName, 'DELETE');
        res.status(deleteStatus.status && ingressStatus.status ? 200 : 400).json(ingressStatus);
        break;
      }
      case WorkspaceEventEnum.RESTART: {
        /* 
          This will create a new engine-gateway pods with the new credentials
        */
        const restartStatus = await workspace.restartDeployment(deploymentSpec);
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

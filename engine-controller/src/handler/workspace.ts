/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Request, Response } from 'express';
import { Logger } from 'winston';

import { annotations, deploymentSpec, ingressName } from '../constants/k8s';
import {
  Workspace,
  WorkspaceEventEnum,
  WorkspaceRequestBody,
} from '../modules';

const port = 4000;
// TODO: Move this to env

export function workspaceHandler(logger: Logger) {
  return async (req: Request, res: Response) => {
    const body = req.body as WorkspaceRequestBody;

    /* 
      We will start the check for workspace gateways
    */
    const workspace = new Workspace(
      body.workspaceId,
      body.slug,
      'engine',
      logger,
      port,
      annotations,
    );

    if (process.env.DEPLOYMENT_MODE === 'k8s') {
      await workspace.checkForNamespace();
    }

    logger.info(`body event ${body.event}`);
    switch (body.event) {
      case WorkspaceEventEnum.CREATE: {
        /* 
          This will create a gateway deployment for the workspace 
          if not found
        */
        let createStatus;
        if (process.env.DEPLOYMENT_MODE === 'k8s') {
          createStatus = await workspace.startCreate(deploymentSpec);
        } else {
          createStatus = await workspace.startCreateDocker();
        }

        res.status(createStatus.status ? 200 : 400).json(createStatus);
        break;
      }
      case WorkspaceEventEnum.DELETE: {
        /* 
          Deleting the deployment and service for the workspace
        */
        let deleteStatus;
        if (process.env.DEPLOYMENT_MODE === 'k8s') {
          deleteStatus = await workspace.startDelete();
        } else {
          deleteStatus = await workspace.deleteDocker();
        }
        res.status(deleteStatus.status ? 200 : 400).json(deleteStatus);
        break;
      }
      case WorkspaceEventEnum.RESTART: {
        /* 
          This will create a new engine-gateway pods with the new credentials
        */
        let restartStatus;
        if (process.env.DEPLOYMENT_MODE === 'k8s') {
          restartStatus = await workspace.restartDeployment(ingressName);
        } else {
          restartStatus = await workspace.restartDocker();
        }
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

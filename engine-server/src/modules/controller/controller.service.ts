/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';
import { Workspace } from '@generated/workspace/workspace.model';

import { ControllerBody, ControllerResponse } from './controller.interface';

@Injectable()
export class ControllerService {
  private readonly logger = new Logger(ControllerService.name);

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async post(
    controllerBody: ControllerBody,
    controllerPath: string,
  ): Promise<ControllerResponse> {
    const CONTROLLER_URL = this.configService.get('CONTROLLER_URL');
    this.logger.log(`Hitting controller with endpoint as ${CONTROLLER_URL} and body as ${JSON.stringify(controllerBody)}`);
    const response = await lastValueFrom(
      this.httpService.post(
        `${CONTROLLER_URL}/${controllerPath}`,
        controllerBody,
      ),
    );
    return response.data
  }
  async deleteExtensionDeployment(
    restartGateway = false,
    extensionDefinition: ExtensionDefinition,
  ) {
    /**
     * This will call controller asking to delete the deployment and service
     * for the extension
     */
    const deleteExtensionDeploymentBody: ControllerBody = {
      event: restartGateway ? 'DELETE' : 'DELETE_WITHOUT_RESTART',
      slug: extensionDefinition.name,
      dockerImage: `${extensionDefinition.dockerRepository}:${extensionDefinition.dockerImageTag}`,
      workspaceSlug: extensionDefinition.workspace.slug,
    };

    await this.post(deleteExtensionDeploymentBody, 'extension');
  }

  async createExtensionDeployment(
    restartGateway = false,
    extensionDefinition: ExtensionDefinition,
    workspaceSlug: string
  ) {
    /**
     * This will call controller asking to create the deployment and service
     * for the extension
     */
    const createExtensionBody: ControllerBody = {
      event: restartGateway ? 'CREATE' : 'CREATE_WITHOUT_RESTART',
      slug: extensionDefinition.name,
      dockerImage: `${extensionDefinition.dockerRepository}:${extensionDefinition.dockerImageTag}`,
      workspaceSlug,
    };
    await this.post(createExtensionBody, 'extension');    
  }

  async createExtensionDeploymentSync(
    restartGateway = false,
    extensionDefinition: ExtensionDefinition,
    workspaceSlug: string
  ) {
    await this.createExtensionDeployment(restartGateway, extensionDefinition, workspaceSlug);

    /**
     * Now the deployment is done we need to wait for that status to be successful
     * After which we can query the service directly
     */
    const counter = 0;
    let deploymentStatus = false;

    /**
     * Try 5 times before we return false and throw some error
     * TODO (harshith): Change this to a better solution later
     */
    while (counter < 5 && !deploymentStatus) {
      deploymentStatus = await this.getExtensionDeploymentStatus(
        extensionDefinition,
      );
      /**
       * Sleep for 5 seconds if the deployment status is false
       */
      if (!deploymentStatus) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    return deploymentStatus;
  }

  async getExtensionDeploymentStatus(
    extensionDefinition: ExtensionDefinition,
  ): Promise<boolean> {
    const controllerBody: ControllerBody = {
      event: 'STATUS',
      slug: extensionDefinition.name,
    };

    const deploymentStatusResponse = await this.post(
      controllerBody,
      'extension',
    );
    return deploymentStatusResponse.status;
  }

  async createGatewayDeployment(workspace: Workspace) {
    /**
     * This will call controller asking to create the deployment and service
     * for the gateway
     */
    const createGatewayBody: ControllerBody = {
      event: 'CREATE',
      slug: workspace.slug,
      workspaceId: workspace.workspaceId
    };

    return await this.post(createGatewayBody, 'workspace');
  }

  async deleteGatewayDeployment(workspace: Workspace) {
    /**
     * Send event to controller to delete the workspace deployment and service
     */
    const controllerBody: ControllerBody = {
      event: 'DELETE',
      slug: workspace.slug,
    };

    return await this.post(controllerBody, 'workspace');
  }

  async getGatewayDeplyomentStatus(workspace: Workspace) {
    const controllerBody: ControllerBody = {
      event: 'STATUS',
      slug: workspace.slug,
    };

    const deploymentStatusResponse = await this.post(
      controllerBody,
      'workspace',
    );
    return deploymentStatusResponse.status;
  }
}

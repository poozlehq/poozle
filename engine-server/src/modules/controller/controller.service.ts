/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

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

    this.logger.log(
      `Hitting controller with endpoint as ${CONTROLLER_URL} and body as ${JSON.stringify(
        controllerBody,
      )}`,
    );
    const response = await lastValueFrom(
      this.httpService.post(
        `${CONTROLLER_URL}/${controllerPath}`,
        controllerBody,
      ),
    );
    return response.data;
  }

  async createGatewayDeployment(workspace: Workspace) {
    /**
     * This will call controller asking to create the deployment and service
     * for the gateway
     */
    const createGatewayBody: ControllerBody = {
      event: 'CREATE',
      slug: workspace.slug,
      workspaceId: workspace.workspaceId,
    };

    return await this.post(createGatewayBody, 'workspace');
  }

  async restartGatewayDeployment(workspace: Workspace) {
    /**
     * This will call controller asking to create the deployment and service
     * for the gateway
     */
    const restartGatewayBody: ControllerBody = {
      event: 'RESTART',
      slug: workspace.slug,
      workspaceId: workspace.workspaceId,
    };

    return await this.post(restartGatewayBody, 'workspace');
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

/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Docker, Options } from 'docker-cli-js';
import { Logger } from 'winston';

import { gateway_image } from '../constants/docker';

export class WorkspaceDocker {
  slug: string;
  docker: Docker;
  workspaceId: string;
  logger: Logger;

  constructor(slug: string, workspaceId: string, logger: Logger) {
    const options = new Options(null, null, true);
    const docker = new Docker(options);

    this.docker = docker;
    this.workspaceId = workspaceId;
    this.slug = slug;
    this.logger = logger;
  }

  async getDeployment() {
    return {
      status: true,
    };
  }

  async createDockerIfNotExists() {
    try {
      const response = await this.docker.command(
        `ps --filter "name=${this.slug}"`,
      );

      if (!response.containersList) {
        // await this.docker.command(`pull ${gateway_image}`);
        const res = await this.docker.command(
          `run --name ${this.slug} --network=engine_poozle -d \
        -e WORKSPACE_ID=${this.workspaceId} \
        -e DATABASE_URL=${process.env.DATABASE_URL} \
        -e JWT_SECRET=${process.env.JWT_ACCESS_SECRET} \
        -e REDIS_URL=${process.env.REDIS_URL} --platform linux/amd64 ${gateway_image} `,
        );
        this.logger.info(
          `Created gateway container ${this.slug} with ID ${res.containerId}`,
        );
      }
      return {
        status: true,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async startCreate() {
    this.createDockerIfNotExists();

    return {
      status: true,
      error: '',
    };
  }

  async startDelete() {
    const response = await this.docker.command(
      `ps --filter "name=${this.slug}"`,
    );
    if (response.containersList) {
      const deleteResponse = await this.docker.command(`rm ${this.slug}`);

      this.logger.info(
        `Delete gateway container ${this.slug} with ID ${deleteResponse.containerId}`,
      );
    }

    return {
      status: true,
      error: '',
    };
  }

  async startRestart() {
    const response = await this.docker.command(
      `ps --filter "name=${this.slug}"`,
    );

    if (response.containersList) {
      await this.docker.command(`restart ${this.slug}`);
    }

    return {
      status: true,
      error: '',
    };
  }
}

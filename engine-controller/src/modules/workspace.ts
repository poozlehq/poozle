/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Base } from './base';
import { deploymentSpec, ingressName } from '../constants/k8s';
import { Container, readDeployment, restartDeployment } from '../utils';

export class Workspace extends Base {
  async startRestart() {
    deploymentSpec.containers.map((container: Container) => {
      container.env = [
        { name: 'WORKSPACE_ID', value: this.id },
        { name: 'DATABASE_URL', value: process.env.DATABASE_URL },
        { name: 'JWT_SECRET', value: process.env.JWT_ACCESS_SECRET },
        { name: 'REDIS_URL', value: process.env.REDIS_URL },
      ];
    });

    try {
      try {
        await readDeployment(this.k8sApi, this.namespace, this.slug);
        this.logger.info('Deployment for this workspace is found.');

        // TODO remove this here
        await restartDeployment(this.k8sApi, this.namespace, this.slug);
        this.logger.info('Deployment for this workspace is restarted.');
        return {
          status: true,
        };
      } catch (e) {
        this.logger.info(
          `Deployment for the workspace ${this.slug} is not found. Creating a new deployment for this workspace`,
        );
        this.createDeployment(deploymentSpec);

        this.logger.info(
          `Creating Service if not exist for the gateway ${this.slug}`,
        );
        this.createServiceIfNotExists();

        this.logger.info(`Add gateway service to the gateway ingress`);
        this.updateIngress(ingressName, 'CREATE_IF_NOT_EXISTS');
        return {
          status: true,
        };
      }
    } catch (e) {
      this.logger.info(
        'Deployment for this workspace was not restarted error occured.',
      );
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }
}

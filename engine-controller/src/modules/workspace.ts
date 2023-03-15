/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Base } from './base';
import { DeploymentSpec, readDeployment, restartDeployment } from '../utils';

export class Workspace extends Base {
  async restartDeployment(deploymentSpec: DeploymentSpec) {
    try {
      try {
        await readDeployment(this.k8sApi, this.namespace, this.slug);
        this.logger.info('Deployment for this workspace is found.');

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
        return {
          status: true
        }
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

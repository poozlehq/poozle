/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Base } from './base';
import { restartDeployment } from '../utils';

export class Workspace extends Base {
  async restartDeployment() {
    try {
      await restartDeployment(this.k8sApi, this.namespace, this.slug);
      this.logger.info('Deployment for this workspace is restarted.');
      return {
        status: true,
      };
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

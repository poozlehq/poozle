/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as k8s from '@kubernetes/client-node';
import { Logger } from 'winston';

import { Namespace } from './namespace';
import { ingressName } from '../constants/k8s';
import {
  DeploymentSpec,
  createDeployment,
  createService,
  deleteDeployment,
  deleteService,
  readDeployment,
  readService,
} from '../utils';
import { updateIngress } from '../utils/ingress';

export class Base {
  /**
   * K8s clients
   */
  k8sApi: k8s.AppsV1Api;
  k8sApiCore: k8s.CoreV1Api;
  k8sNetworkingV1Api: k8s.NetworkingV1Api;

  id: string;
  slug: string;
  namespace: string;
  port: number;
  logger: Logger;
  annotations: Record<string, string>;

  constructor(
    id: string,
    slug: string,
    namespace: string,
    logger: Logger,
    port?: number,
    annotations?: Record<string, string>,
  ) {
    // Generates a client from an existing kubeconfig whether in memory
    // or from a file.

    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const k8sApiCore = kc.makeApiClient(k8s.CoreV1Api);
    const k8sNetworkingV1Api = kc.makeApiClient(k8s.NetworkingV1Api);

    this.id = id;
    this.k8sApi = k8sApi;
    this.k8sApiCore = k8sApiCore;
    this.k8sNetworkingV1Api = k8sNetworkingV1Api;
    this.slug = slug;
    this.namespace = namespace;
    this.logger = logger;
    this.port = port;
    this.annotations = annotations;
  }

  async checkForNamespace() {
    const namespace = new Namespace('engine', this.k8sApiCore, this.logger);
    /* 
      This will create the engine-gateway namespace if not present
      in which all the gateway pods will go into
    */
    await namespace.createIfNotExist();
  }

  async createDeployment(deploymentSpec: DeploymentSpec) {
    try {
      const deployment = await createDeployment(
        this.k8sApi,
        this.namespace,
        this.slug,
        deploymentSpec,
      );
      this.logger.info(`Deployment for the workspace ${this.slug} is created`);
      return {
        status: true,
        deployment: deployment.body,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async createDeploymentIfNotExists(deploymentSpec: DeploymentSpec) {
    try {
      const response = await readDeployment(
        this.k8sApi,
        this.namespace,
        this.slug,
      );
      this.logger.info('Deployment for this workspace is found.');
      const deployment = response.body;
      return {
        status: true,
        deployment,
      };
    } catch (e) {
      this.logger.info(
        `Deployment for the workspace ${this.slug} is not found. Creating a new deployment for this workspace`,
      );

      return this.createDeployment(deploymentSpec);
    }
  }

  async createService() {
    try {
      const service = await createService(
        this.k8sApiCore,
        this.namespace,
        this.slug,
        this.port,
        this.annotations,
      );
      return {
        status: true,
        service: service.body,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async createServiceIfNotExists() {
    try {
      const response = await readService(
        this.k8sApiCore,
        this.namespace,
        this.slug,
      );
      this.logger.info('Service for this workspace is found.');
      const service = response.body;
      return {
        status: true,
        service,
      };
    } catch (e) {
      this.logger.info(
        `Service for the workspace ${this.slug} is not found. Creating a new service for this workspace`,
      );
      return this.createService();
    }
  }

  async deleteDeployment() {
    try {
      await deleteDeployment(this.k8sApi, this.namespace, this.slug);
      this.logger.info('Deployment for this workspace is deleted.');
      return {
        status: true,
      };
    } catch (e) {
      this.logger.info(
        'Deployment for this workspace was not deleted error occured.',
      );
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async deleteService() {
    try {
      await deleteService(this.k8sApiCore, this.namespace, this.slug);
      this.logger.info('Service for this workspace is deleted.');
      return {
        status: true,
      };
    } catch (e) {
      this.logger.info(
        'Service for this workspace was not deleted error occured.',
      );
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async startCreate(deploymentSpec: DeploymentSpec) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deploymentStatus: any = await this.createDeploymentIfNotExists(
        deploymentSpec,
      );
      if (deploymentStatus.status) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const serviceStatus: any = await this.createServiceIfNotExists();
        return {
          status: serviceStatus.status,
          error: serviceStatus?.error,
        };
      }

      const ingressStatus = await this.updateIngress(ingressName, 'CREATE');

      return {
        status: deploymentStatus.status && ingressStatus.status,
        error: deploymentStatus?.error,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async startDelete() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deploymentStatus: any = await this.deleteDeployment();
      if (deploymentStatus.status) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const serviceStatus: any = await this.deleteService();

        const ingressStatus = await this.updateIngress(ingressName, 'DELETE');

        return {
          status: serviceStatus.status && ingressStatus.status,
          error: serviceStatus?.error,
        };
      }

      return {
        status: deploymentStatus.status,
        error: deploymentStatus?.error,
      };
    } catch (e) {
      this.logger.error(e);
      return {
        status: false,
        error: e,
      };
    }
  }

  async getDeployment() {
    try {
      const response = await readDeployment(
        this.k8sApi,
        this.namespace,
        this.slug,
      );
      this.logger.info('Deployment found for this Workspace');
      return {
        status: true,
        availableReplicas: response.body.status?.availableReplicas,
      };
    } catch (e) {
      return {
        status: false,
        error: 'Deployment not found for this Workspace',
      };
    }
  }

  async updateIngress(ingressName: string, event: string) {
    this.logger.info(`updating ingress gateway ${ingressName}`);
    try {
      await updateIngress(
        this.logger,
        this.k8sNetworkingV1Api,
        this.namespace,
        this.slug,
        ingressName,
        event,
      );

      return {
        status: true,
      };
    } catch (e) {
      this.logger.info(`Failed to update ingress gateway ${ingressName}`);
      this.logger.error(e);
      return {
        status: true,
        error: e,
      };
    }
  }
}

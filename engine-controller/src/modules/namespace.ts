/** Copyright (c) 2023, Poozle, all rights reserved. **/

import * as k8s from '@kubernetes/client-node';
import { Logger } from 'winston';

import { createNamespace, readNamespace } from '../utils';

export class Namespace {
  namespace: string;
  k8sApiCore: k8s.CoreV1Api;
  logger: Logger;

  constructor(namespace: string, k8sApiCore: k8s.CoreV1Api, logger: Logger) {
    this.namespace = namespace;
    this.k8sApiCore = k8sApiCore;
    this.logger = logger;
  }

  async createNamespace() {
    try {
      const response = await createNamespace(this.k8sApiCore, this.namespace);
      this.logger.info('Namespace is created.');
      return response;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async createIfNotExist() {
    try {
      const response = await readNamespace(this.k8sApiCore, this.namespace);
      this.logger.info('Namespace is found.');
      const namespace = response.body;
      return namespace;
    } catch (err) {
      this.logger.info('Namespace is not found. Creating the namespace now.');
      return this.createNamespace();
    }
  }
}

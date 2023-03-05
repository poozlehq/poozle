/** Copyright (c) 2023, Poozle, all rights reserved. **/

import * as k8s from '@kubernetes/client-node';

const defaultService = {
  apiVersion: 'v1',
  kind: 'Service',
};

export async function createService(
  k8sApiCore: k8s.CoreV1Api,
  namespace: string,
  serviceName: string,
  port: number,
  annotations?: Record<string, string>
) {
  return await k8sApiCore.createNamespacedService(namespace, {
    ...defaultService,
    metadata: {
      name: serviceName,
      annotations: annotations
    },
    spec: {
      selector: {
        app: serviceName,
      },
      type: 'LoadBalancer',
      ports: [
        {
          protocol: 'TCP',
          port: 80,
          targetPort: port,
        },
      ],
    },
  });
}

export async function readService(
  k8sApiCore: k8s.CoreV1Api,
  namespace: string,
  serviceName: string,
) {
  return await k8sApiCore.readNamespacedService(serviceName, namespace);
}

export async function deleteService(
  k8sApiCore: k8s.CoreV1Api,
  namespace: string,
  serviceName: string,
) {
  return await k8sApiCore.deleteNamespacedService(serviceName, namespace);
}

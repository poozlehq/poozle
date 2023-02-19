/** Copyright (c) 2023, Poozle, all rights reserved. **/

import * as k8s from '@kubernetes/client-node';

export async function createNamespace(
  k8sApiCore: k8s.CoreV1Api,
  namespace: string,
) {
  return await k8sApiCore.createNamespace({
    apiVersion: 'v1',
    kind: 'Namespace',
    metadata: {
      name: namespace,
    },
  });
}

export async function readNamespace(
  k8sApiCore: k8s.CoreV1Api,
  namespace: string,
) {
  return await k8sApiCore.readNamespace(namespace);
}

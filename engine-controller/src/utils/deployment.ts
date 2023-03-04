/** Copyright (c) 2023, Poozle, all rights reserved. **/

import * as k8s from '@kubernetes/client-node';

const defaultWorkspace = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
};

const defaultStrategy = {
  type: 'RollingUpdate',
  rollingUpdate: {
    maxSurge: 2,
    maxUnavailable: 0,
  },
};

export interface containerEnv{
  name: string;
  value: string;
}

export interface Container {
  image: string;
  name: string;
  env?: containerEnv[]
}

export interface DeploymentSpec {
  containers: Container[];
}

export async function createDeployment(
  k8sApi: k8s.AppsV1Api,
  namespace: string,
  deploymentName: string,
  deploymentSpec: DeploymentSpec,
) {
  return await k8sApi.createNamespacedDeployment(namespace, {
    ...defaultWorkspace,
    metadata: {
      name: deploymentName,
    },
    spec: {
      strategy: defaultStrategy,
      replicas: 1,
      selector: {
        matchLabels: {
          app: deploymentName,
        },
      },
      template: {
        metadata: {
          labels: {
            app: deploymentName,
          },
          annotations: {
            restartedAt: null,
          }
        },
        spec: deploymentSpec,
      },
    },
  });
}

export async function readDeployment(
  k8sApi: k8s.AppsV1Api,
  namespace: string,
  deploymentName: string,
) {
  return await k8sApi.readNamespacedDeployment(deploymentName, namespace);
}

export async function deleteDeployment(
  k8sApi: k8s.AppsV1Api,
  namespace: string,
  deploymentName: string,
) {
  return await k8sApi.deleteNamespacedDeployment(deploymentName, namespace);
}

export async function restartDeployment(
  k8sApi: k8s.AppsV1Api,
  namespace: string,
  deploymentName: string,
) {

  // we get this error `unsupported media type back by the api` without this headers
  const headers = { headers: { 'content-type': 'application/json-patch+json' }}

  // As we changed the headers to json-path, we need to send the body in the JSON Patch format
  const spec = [
    {
      op: 'replace',
      path: '/spec/template/metadata/annotations/restartedAt',
      value: new Date().toISOString(),
    },
  ]

  return await k8sApi.patchNamespacedDeployment(deploymentName, namespace, spec, 
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    headers);
}

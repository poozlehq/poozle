/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as k8s from '@kubernetes/client-node';
import { Logger } from 'winston';

export interface port {
  number: Number;
}

export interface service {
  name: string;
  port: port;
}

export interface backend {
  service: service;
}

export interface path {
  backend: backend;
  path: string;
  pathType: string;
}

export async function updateIngress(
  logger: Logger,
  k8sApiNetwork: k8s.NetworkingV1Api,
  namespace: string,
  serviceName: string,
  ingressName: string,
  event: string,
) {
  logger.info(`Reading ingress ${ingressName} in this namespace ${namespace}`);
  const response = await k8sApiNetwork.readNamespacedIngress(
    ingressName,
    namespace,
    null,
    {
      headers: { 'content-type': 'application/json' },
    },
  );

  let currentIngress = response.body;

  let lastAppliedConfig = JSON.parse(
    currentIngress.metadata.annotations[
      'kubectl.kubernetes.io/last-applied-configuration'
    ],
  );

  let servicePaths = lastAppliedConfig.spec.rules[0].http.paths;

  if (event === 'CREATE_IF_NOT_EXISTS') {
    logger.info(
      `Cheking Path for this service ${serviceName} present in the ingress ${ingressName}`,
    );
    const servicePresent =
      servicePaths.filter(function (path: path) {
        return path.backend.service.name === serviceName;
      }).length > 0;

    if (servicePresent) {
      return {
        status: true,
      };
    }
    logger.info(`Service path is not present in the ingress ${ingressName}`);
    event = 'CREATE';
  }

  if (event === 'CREATE') {
    logger.info(
      `Creating Path for this service ${serviceName} in this ingress ${ingressName}`,
    );
    servicePaths.push({
      backend: {
        service: {
          name: serviceName,
          port: {
            number: 80,
          },
        },
      },
      path: `/${serviceName}/*`,
      pathType: 'ImplementationSpecific',
    });
  } else if (event === 'DELETE') {
    logger.info(
      `Deleting Path for this service ${serviceName} in this ingress ${ingressName}`,
    );
    servicePaths = servicePaths.filter(function (path: path) {
      return path.backend.service.name !== serviceName;
    });
  }

  // As we changed the headers to json-path, we need to send the body in the JSON Patch format
  const spec = [
    {
      op: 'replace',
      path: '/spec/rules/0/http',
      value: { paths: servicePaths },
    },
  ];

  // we get this error `unsupported media type back by the api` without this headers
  const headers = {
    headers: { 'content-type': 'application/json-patch+json' },
  };

  try {
    await k8sApiNetwork.patchNamespacedIngress(
      ingressName,
      namespace,
      spec,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      headers,
    );

    logger.info(`Patched Ingress ${ingressName} successfully`);

    return {
      status: true,
    };
  } catch (e) {
    logger.info(`Patch Ingress ${ingressName} failed with an error`);
    logger.error(e);
    return {
      status: false,
      error: e,
    };
  }
}

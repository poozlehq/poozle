/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as k8s from '@kubernetes/client-node';

export async function updateIngress(
  k8sApiNetwork: k8s.NetworkingV1Api,
  namespace: string,
  serviceName: string,
  ingressName: string,
  event: string,
) {
  const response = await k8sApiNetwork.readNamespacedIngress(
    ingressName,
    namespace,
    null,
    {
      headers: { 'content-type': 'application/json' },
    },
  );

  const currentIngress = response.body;

  const lastAppliedConfig = JSON.parse(
    currentIngress.metadata.annotations[
      'kubectl.kubernetes.io/last-applied-configuration'
    ],
  );

  if (event === 'CREATE') {
    lastAppliedConfig.spec.rules[0].http.paths.push({
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
  }

  // const updatedPaths = {paths: lastAppliedConfig.spec.rules[0].http.paths}
  // console.log(lastAppliedConfig.spec.rules[0].http.paths);

  // return currentIngress;

  // we get this error `unsupported media type back by the api` without this headers
  // const headers = {
  //   headers: { 'content-type': 'application/json-patch+json' },
  // };

  // // As we changed the headers to json-path, we need to send the body in the JSON Patch format
  // const spec = [
  //   {
  //     op: 'replace',
  //     path: '/spec/rules/0/http',
  //     value: JSON.stringify(updatedPaths),
  //   },
  // ];

  // const ingressResponse = await k8sApiNetwork.patchNamespacedIngress(
  //   'example-ingress',
  //   'engine',
  //   spec,
  //   null,
  //   null,
  //   null,
  //   null,
  //   null,
  //   headers,
  // );

  // console.log(ingressResponse.body)

  // return ingressResponse.body;
  return true;
}

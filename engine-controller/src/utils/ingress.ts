/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as k8s from '@kubernetes/client-node';

export async function updateIngress(
  k8sApiNetwork: k8s.NetworkingV1Api,
  namespace: string,
  serviceName: string,
) {
  const response = await k8sApiNetwork.readNamespacedIngress(
    serviceName,
    namespace,
  );
  const currentIngress = response.body;
  return currentIngress;
}

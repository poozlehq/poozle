/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const annotations = {
  'beta.cloud.google.com/backend-config': '{"default": "gateway-config"}',
  'networking.gke.io/load-balancer-type': 'Internal',
};

export const ingressName = process.env.INGRESS_NAME;

export const deploymentSpec = {
  containers: [
    {
      image: `poozlehq/engine-gateway:${process.env.ENGINE_VERSION}`,
      name: 'gateway',
    },
  ],
};

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: 'src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '30m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;

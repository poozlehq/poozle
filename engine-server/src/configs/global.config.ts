/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { API_PREFIX } from '../shared/constants/global.constants';
import { Config } from './config.interface';

export const GLOBAL_CONFIG: Config = {
  nest: {
    port: 3000,
    graphql_port: 8000,
    graphql_gateway_port: 8001,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Poozle',
    description: 'Poozle API',
    version: '1.5',
    path: API_PREFIX,
  },
};

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';

import * as SuperTokensConfig from 'common/configs/config';

@Injectable()
export class SupertokensService {
  constructor() {
    supertokens.init({
      appInfo: {
        appName: 'Poozle',
        apiDomain: process.env.BACKEND_HOST,
        websiteDomain: process.env.FRONTEND_HOST,
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
      supertokens: {
        connectionURI: process.env.SUPERTOKEN_CONNECTION_URI,
      },
      recipeList: SuperTokensConfig.recipeList,
    });
  }
}

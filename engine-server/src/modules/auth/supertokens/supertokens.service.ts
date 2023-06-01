/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';

import * as SuperTokensConfig from 'common/configs/config';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: SuperTokensConfig.recipeList,
    });
  }
}

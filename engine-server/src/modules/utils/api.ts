/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { ExtensionDefinitionCheck } from 'modules/extension_definition/extension_definition.interface';

import { ExtensionBody, SpecConfig } from './api.types';

@Injectable()
export class ExtensionApi {
  httpService: HttpService;
  configService: ConfigService;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpService = httpService;
    this.configService = configService;
  }

  getExtensionURL(endpoint: string) {
    const ON_KUBERNETES = this.configService.get('ON_KUBERNETES');

    if (ON_KUBERNETES === 'True') {
      const EXTENSION_BASE_HOST = this.configService.get('EXTENSION_BASE_HOST');
      return `http://${endpoint}${EXTENSION_BASE_HOST}/graphql`;
    }

    // Done for to test in local we can remove this if we figure out a better way
    return endpoint;
  }

  async getSpec(extensionBody: ExtensionBody): Promise<SpecConfig> {
    const extensionURL = this.getExtensionURL(extensionBody.endpoint);

    const response = await lastValueFrom(
      this.httpService.post(extensionURL, { query: extensionBody.query }),
    );

    return response.data.data.getSpec;
  }

  async check(extensionBody: ExtensionBody): Promise<ExtensionDefinitionCheck> {
    const extensionURL = this.getExtensionURL(extensionBody.endpoint);

    const response = await lastValueFrom(
      this.httpService.post(extensionURL, { query: extensionBody.query }),
    );

    return response.data.data.check;
  }
}

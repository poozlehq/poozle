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

  // Remove this later
  getExtensionURL(endpoint: string) {
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
      this.httpService.post(extensionURL, {
        query: extensionBody.query,
        variables: extensionBody.variables,
      }),
    );

    return response.data.data.check;
  }
}

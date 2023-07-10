/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseIntegration, GenericProxyModel, SpecificationResponse } from '@poozle/engine-idk';

import spec from './spec';

class AsanaIntegration extends BaseIntegration {
  async spec(): SpecificationResponse {
    return spec;
  }

  models() {
    return [new GenericProxyModel()];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function main(command: string, allParams: any) {
  const integration = new AsanaIntegration();

  const response = await integration.runCommand(command, allParams);

  return response;
}

export default main;

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CollectionsResponse } from './collection.interface';
import { convertCollection } from './collection.utils';

export class CollectionsPath extends BasePath {
  async run(
    _method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<CollectionsResponse> {
     /**
     * TODO: You need to call the respective API return the data as expected by the type.
     * You can check the github integration for reference.
     */
  }
}

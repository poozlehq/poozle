import { ActionParams, Spec, HTTPAction, Builder } from '@poozle/edk';
import { cliGet } from '../utils/cli';
import { Issue } from '../types';

import { apiGet } from '../utils/api';

const { Search, Input, Select, TextInput, SearchResult } = Builder;

export class SearchAppAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://api.github.com';
  key = /search-app*/i;

  path = '{OWNER}/{REPO}/issues';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    const repos: any = await cliGet('any');
    console.log(repos);


    return undefined;
  }
}

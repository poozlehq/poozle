import { ActionParams, Spec, Builder, ScriptAction } from '@poozle/edk';
import { cliGet } from '../utils/cli';

const { Search, Input, Select, TextInput, SearchResult } = Builder;

export class SearchAppAction extends ScriptAction {
  defaultHeaders = {};
  key = /search-app*/i;
  path = '';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'search-app') {
      return Search()
      .blocks(
        Input({
          label: 'Search App',
        }).element(
          Select().fetchDataId('search_app').actionId('app_path'),
        )
      ).callbackId('open-app');
        
    }

    if (callback_id === 'open-app') {
      // app_name should be full path
      const path = `open ${params.app_path}`;

      await cliGet(path);
    }

    return undefined;
  }
}

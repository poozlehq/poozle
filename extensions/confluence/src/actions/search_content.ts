import { ActionParams, Spec, HTTPAction, Builder,  } from '@poozle/edk';

const { Search, Input, Select, TextInput, QuickAction, QuickActionTypeEnum } = Builder;

export class SearchContentAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://{subdomain}.atlassian.net';
  key = /search-content*/i;

  path = '';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'search-content') {
      return Search()
      .blocks(
        Input({
          label: 'Space Name',
        }).element(
          Select().fetchDataId('space_name').actionId('search_key'),
        ),
        Input({
          label: 'Search Text',
        }).element(
          TextInput({ placeholder: 'Search anything' }).actionId(
            'search_key',
          ),
        ),
      ).fetchDataId('search_content').actionId('content').callbackId('search-content-open');
    }
    else if(callback_id == 'search-content-open') {
      return QuickAction({
        quickActionType: QuickActionTypeEnum.OPEN,
        value: params.url,
        title: params.text
      })
    }
  }
}

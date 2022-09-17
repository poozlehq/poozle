import { ActionParams, Spec, HTTPAction, Builder,  } from '@poozle/edk';

const { Search, Input, Select, TextInput, QuickAction, QuickActionTypeEnum } = Builder;

export class GetMentionsAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://{subdomain}.atlassian.net';
  key = /get-mentions*/i;

  path = '';

  async run(
    callback_id: string,
    params: ActionParams,
    spec: any,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'get-mentions') {
      return Search()
      .blocks().fetchDataId('get_mentions').callbackId('search-content-open');
    }
    else if(callback_id == 'get-mentions-open') {
      return QuickAction({
        quickActionType: QuickActionTypeEnum.OPEN,
        value: params.url,
        title: params.text
      })
    }
  }
}

import {
  AbstractCommand,
  Authentication,
  DoParams,
  Builder,
} from '@poozle/edk';
import { SendMessageAction } from '../actions/send_message';
import { Conversation } from '../types';

import { get } from '../utils/api';

const { Option } = Builder;

export class SendMessage extends AbstractCommand {
  key = 'send-message';
  name = 'Send message';
  description = 'Sends a new message to a channel or a person';
  icon = 'slack.svg';

  callbackKeys: Array<string> = [this.key];
  fetchDataKeys: Array<string> = ['repository_name'];

  path = '/repos/{owner}/{repo}/issues';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new SendMessageAction()];
  }

  async fetchDataController(
    key: string,
    params: DoParams,
    authentication: Authentication,
  ) {
    if (key === 'channel_name') {
      const list: Conversation[] = await get(
        `https://slack.com/api/conversations.list`,
        authentication.bearer_token,
      );

      return list.map((repo: Conversation) => {
        return Option({
          text: repo.name,
          // icon: repo.avatar_url,
          value: repo.id,
        }).build();
      });
    }
  }
}

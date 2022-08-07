import { ActionParams, Authentication, HTTPAction, Builder } from '@poozle/edk';
import { post } from '../utils/api';

const { Input, Form, TextInput, Section, Select } = Builder;

export class SendMessageAction extends HTTPAction {
  defaultHeaders = {};
  baseUrl = 'https://slack.com/api';
  key = /send-message*/i;

  path = '/chat.postMessage';

  async run(
    callback_id: string,
    params: ActionParams,
    authentication: Authentication,
  ): Promise<Builder.Surface> | undefined {
    if (callback_id === 'send-message') {
      return Form()
        .blocks(
          Input({
            label: 'Channels (or) People',
          }).element(
            Select().fetchDataId('channel_name').actionId('channel_id'),
          ),
          Section().blocks(
            Input({
              label: 'Message',
            }).element(
              TextInput({
                placeholder: 'Enter your message here',
              }).actionId('text'),
            ),
          ),
        )
        .callbackId('send-message-submitted');
    }

    if (callback_id === 'send-message-submitted') {
      console.log(callback_id, params, authentication);
      await post(this.baseUrl + this.path, authentication.bearer_token, {
        channel: params.channel_id,
        text: params.text,
      });
    }

    return undefined;
  }
}

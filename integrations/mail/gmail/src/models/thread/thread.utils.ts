/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Thread } from '@poozle/engine-idk';

import { convertMessage } from 'models/message/message.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertThread(data: any): Thread {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = data.messages.map((message: any) => {
    return convertMessage(message);
  });

  return {
    id: data.id,
    history_id: data.historyId,
    messages,
  };
}

export const tagMapping = {
  name: 'name',
  description: 'description',
  color: 'color',
};

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { convertMessage } from 'models/message/message.utils';

export interface threadResponse {
  id: string;
  snippet: string;
  historyId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertThread(data: any) {
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

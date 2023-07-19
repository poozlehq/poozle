/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Message } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface MessagesResponse {
  data: Message[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
}

export interface MessageResponse {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: Message | {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw?: any;
  error?: string;
}

export interface GmailMessageResponse {
  id: string;
  thread_id: string;
}

export interface File {
  content_id: string;
  content_type: string;
  filename: string;
}

export interface ExtractedBody {
  textBody: string;
  htmlBody: string;
  files: File[];
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsArray, IsOptional, IsString } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class ListMessagesQueryParams extends QueryParams {
  @IsOptional()
  @IsString()
  received_after?: string;

  @IsOptional()
  @IsString()
  received_before?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  cc?: string;

  @IsOptional()
  @IsString()
  bcc?: string;

  @IsOptional()
  @IsString()
  labes?: string[];

  @IsOptional()
  @IsString()
  starred?: string;

  @IsOptional()
  @IsString()
  unread?: string;
  
  @IsOptional()
  @IsString()
  direction?: string;
}

export class CommonMessageQueryParams extends JustRawParams {}

export class PathParamsWithMessageId {
  @IsString()
  message_id: string;
}

export class Recipient {
  email: string;
  name: string;
}

export class Message {
  id: string;
  body: string;
  html_body: string;
  user_id: string;
  date: string;
  snippet: string;
  subject: string;
  thread_id: string;
  starred: boolean;
  unread: boolean;
  cc: Recipient[];
  bcc: Recipient[];
  from: Recipient[];
  reply_to: Recipient[];
  labels: string[];
  in_reply_to: string;
}

export class MailMessageResponse {
  data: Message;
}
export class MailMessagesResponse {
  data: Message[];
  meta: Meta;
}

export class CreateMessageBody {
  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  html_body: string;

  @IsOptional()
  @IsString()
  thread: string;

  @IsOptional()
  @IsArray()
  cc: Recipient[];

  @IsOptional()
  @IsArray()
  bcc: Recipient[];

  @IsOptional()
  @IsArray()
  from: Recipient[];

  @IsOptional()
  @IsArray()
  to: Recipient[];

  @IsOptional()
  @IsArray()
  reply_to: Recipient[];

  @IsOptional()
  @IsString()
  in_reply_to: string;
}

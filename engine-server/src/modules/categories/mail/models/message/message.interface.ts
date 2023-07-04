/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsOptional, IsString } from 'class-validator';

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
  assignee_id?: string;
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
  ticket_url: string;
  cc: Recipient[];
  bcc: Recipient[];
  from: Recipient[];
  reply_to: Recipient[];
  labels: string[];
}

export class MailMessageResponse {
  data: Message;
}
export class MailMessagesResponse {
  data: Message[];
  meta: Meta;
}

// export class CreateMessageBody {
//   @IsString()
//   name: string;

//   @IsString()
//   description: string;

//   @IsOptional()
//   @IsArray()
//   assignees: Array<Exclude<MessageAssignee, 'username'>>;

//   @IsOptional()
//   @IsArray()
//   tags: MessageTag[];

//   @IsOptional()
//   @IsString()
//   created_by: string;

//   @IsOptional()
//   @IsString()
//   type: string;
// }

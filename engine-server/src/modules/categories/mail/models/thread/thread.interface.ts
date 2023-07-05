/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsOptional, IsString } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

import { Message } from '../message/message.interface';

export class ListThreadsQueryParams extends QueryParams {
  @IsOptional()
  @IsString()
  started_after?: string;

  @IsOptional()
  @IsString()
  started_before?: string;

  @IsOptional()
  @IsString()
  last_updated_before?: string;

  @IsOptional()
  @IsString()
  last_updated_after?: string;

  @IsOptional()
  @IsString()
  assignee_id?: string;
}

export class CommonThreadQueryParams extends JustRawParams {}

export class PathParamsWithThreadId {
  @IsString()
  thread_id: string;
}

export class Thread {
  id: string;
  history_id: string;
  messages: Message[];
}

export class MailThreadResponse {
  data: Thread;
}
export class MailThreadsResponse {
  data: Thread[];
  meta: Meta;
}

// export class CreateThreadBody {
//   @IsString()
//   name: string;

//   @IsString()
//   description: string;

//   @IsOptional()
//   @IsArray()
//   assignees: Array<Exclude<ThreadAssignee, 'username'>>;

//   @IsOptional()
//   @IsArray()
//   tags: ThreadTag[];

//   @IsOptional()
//   @IsString()
//   created_by: string;

//   @IsOptional()
//   @IsString()
//   type: string;
// }

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  DIRECTION_ENUM,
  JustRawParams,
  QueryParams,
} from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

enum SORT_ENUM {
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}
export class CommentQueryParams extends QueryParams {
  @IsOptional()
  @IsEnum(SORT_ENUM)
  sort?: string;

  @IsOptional()
  @IsEnum(DIRECTION_ENUM)
  direction?: string;
}

export class CommonCommentQueryParams extends JustRawParams {}

interface Creator {
  id: string;
  username: string;
}

export class Comment {
  id: string;
  ticket_id: string;
  body: string;
  html_body: string;
  created_by_id: string;
  created_by: Creator;
  is_private: string;
  created_at: string;
  updated_at: string;
}

export class TicketingCommentsResponse {
  data: Comment[];
  meta: Meta;
}

export class TicketingCommentResponse {
  data: Comment;
}

export class PathParams {
  @IsString()
  collection_id: string;

  @IsString()
  ticket_id: string;
}

export class PathParamsWithCommentId {
  @IsString()
  comment_id: string;

  @IsString()
  collection_id: string;

  @IsString()
  ticket_id: string;
}

export class UpdateCommentBody {
  @IsString()
  body: string;
}

export class CreateCommentBody {
  @IsString()
  body: string;
}

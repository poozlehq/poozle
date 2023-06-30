/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class CollectionQueryParams extends QueryParams {}
export class GetCollectionQueryParams extends JustRawParams {}

export class Collection {
  id: string;
  parent_id: string;
  type: string;
  name: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export class TicketingCommentsResponse {
  data: Comment[];
  meta: Meta;
}

export class TicketingCommentResponse {
  data: Comment;
}

export class PathParamsWithCommentId {
  @IsString()
  comment_id: string;

  @IsString()
  collection_id: string;

  @IsString()
  ticket_id: string;
}

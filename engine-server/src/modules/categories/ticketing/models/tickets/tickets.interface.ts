/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class ListTicketsQueryParams extends QueryParams {}
export class GetTicketQueryParams extends JustRawParams {}

export class PathParams {
  @IsString()
  collection_id: string;
}

export class PathParamsWithTicketId {
  @IsString()
  collection_id: string;

  @IsString()
  ticket_id: string;
}

export interface Assignee {
  id: string;
  username: string;
}

export interface Tag {
  id: string;
  name: string;
}

export class Ticket {
  id: number;
  parent_id: string;
  collection_id: string;
  type: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  ticket_url: string;
  assignees: Assignee[];
  updated_at: string;
  created_at: string;
  created_by: string;
  due_date: string;
  completed_at: string;
  tags: Tag[];
}

export class TicketingTicketResponse {
  data: Ticket;
}
export class TicketingTicketsResponse {
  data: Ticket[];
  meta: Meta;
}

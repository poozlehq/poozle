/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import {
  QueryParams,
  JustRawParams,
  DIRECTION_ENUM,
} from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

enum SORT_ENUM {
  'name' = 'name',
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}

enum STATUS_ENUM {
  'open' = 'open',
  'closed' = 'closed',
  'all' = 'all',
}

export class ListTicketsQueryParams extends QueryParams {
  @IsOptional()
  @IsEnum(SORT_ENUM)
  sort?: string;

  @IsOptional()
  @IsEnum(DIRECTION_ENUM)
  direction?: string;

  @IsOptional()
  @IsEnum(STATUS_ENUM)
  status?: string;

  @IsOptional()
  @IsString()
  since?: string;

  @IsOptional()
  @IsString()
  assignee_id?: string;
}

export class CommonTicketQueryParams extends JustRawParams {}

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

export interface TicketAssignee {
  id: string;
  username: string;
}

export interface TicketTag {
  id: string;
  name: string;
}

export interface Ticket {
  id: string;
  parent_id: string;
  collection_id: string;
  type: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  ticket_url: string;
  assignees: TicketAssignee[];
  updated_at: string;
  created_at: string;
  created_by: string;
  due_date: string;
  completed_at: string;
  tags: TicketTag[];
}

export class TicketingTicketResponse {
  data: Ticket;
}
export class TicketingTicketsResponse {
  data: Ticket[];
  meta: Meta;
}

export class CreateTicketBody {
  @IsString()
  collection_id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  assignees: Array<Exclude<TicketAssignee, 'username'>>;

  @IsArray()
  tags: TicketTag[];

  @IsString()
  created_by: string;

  @IsString()
  type: string;
}

export class UpdateTicketBody {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  assignees: Array<Exclude<TicketAssignee, 'username'>>;

  @IsArray()
  tags: TicketTag[];

  @IsString()
  status: string;

  @IsString()
  created_by: string;

  @IsString()
  type: string;
}

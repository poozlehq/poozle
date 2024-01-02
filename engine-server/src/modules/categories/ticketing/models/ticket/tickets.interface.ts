/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

import { QueryParams, JustRawParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class ListTicketsQueryParams extends QueryParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class GetTicketsQueryParams extends QueryParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class CommonTicketQueryParams extends JustRawParams {}

export class PathParamsWithCollectionId {
  @IsString()
  collection_id: string;
}

export class PathParamsWithTicketId {
  @IsString()
  collection_id: string;

  @IsString()
  ticket_id: string;
}

export class TicketAssignee {
  id: string;
  username: string;
}

export class TicketTag {
  id: string;
  name: string;
}

export class Ticket {
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
export const TICKET_KEYS = [
  'id',
  'parent_id',
  'collection_id',
  'type',
  'name',
  'description',
  'status',
  'priority',
  'ticket_url',
  'assignees',
  'updated_at',
  'created_at',
  'created_by',
  'due_date',
  'completed_at',
  'tags',
];

export class TicketingTicketResponse {
  data: Ticket;
}
export class TicketingTicketsResponse {
  data: Ticket[];
  meta: Meta;
}

export class CreateTicketBody {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  assignees: Array<Exclude<TicketAssignee, 'username'>>;

  @IsOptional()
  @IsArray()
  tags: TicketTag[];

  @IsOptional()
  @IsString()
  created_by: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsObject()
  custom_fields: Record<string, CustomFieldValue>;
}

export type CustomFieldValue = string | number | boolean | Date;

export class UpdateTicketBody {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  assignees: Array<Exclude<TicketAssignee, 'username'>>;

  @IsOptional()
  @IsArray()
  tags: TicketTag[];

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  created_by: string;

  @IsOptional()
  @IsString()
  type: string;
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Assignee {
  id: string;
  username: string;
}

export interface TicketTag {
  id: string;
  name: string;
}

export type CustomFieldValue = string | number | boolean | Date;


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
  assignees: Assignee[];
  updated_at: string;
  created_at: string;
  created_by: string;
  due_date: string;
  completed_at: string;
  tags: TicketTag[];
}

export interface CreateTicketBody {
  collection_id: string;
  name: string;
  description: string;
  assignees: Array<Exclude<Assignee, 'username'>>;
  tags: TicketTag[];
  created_by: string;
  type: string;
  custom_fields: Record<string, CustomFieldValue>;
}

export interface UpdateTicketBody {
  name: string;
  description: string;
  assignees: Array<Exclude<Assignee, 'username'>>;
  tags: TicketTag[];
  status: string;
  created_by: string;
  type: string;
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { convertTimestampToTZFormat } from 'common';

import { TicketWithRaw } from './ticket.interface';

export const ticketMappings = {
  name: 'summary',
  description: 'description',
  assignees: 'assignees',
  tags: 'label',
  status: 'status',
  type: 'issuetype',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTicket(data: any, collection_id: string | null): TicketWithRaw {
  return {
    id: data.key,
    name: data.fields.summary,
    collection_id: collection_id ? collection_id : data.fields.project.key,
    description: data.fields.description,
    status: data.fields.status.name,
    created_at: convertTimestampToTZFormat(data.fields.created),
    updated_at: convertTimestampToTZFormat(data.fields.updated),
    created_by: data.fields.creator.displayName,
    type: data.fields.issuetype.name,
    assignees: [
      { id: data.fields.assignee?.accountId, username: data.fields.assignee?.displayName },
    ],
    ticket_url: data.self,
    parent_id: data.fields.parent?.id,
    priority: data.fields.priority.name,
    due_date: data.fields.duedate ? convertTimestampToTZFormat(data.fields.duedate) : '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags: data.labels?.map((lab: any) => ({
      id: lab.id,
      name: lab.displayName,
    })),

    // extra
    completed_at: '',

    // Raw
    raw: data,
  };
}

export interface JIRATicketBody {
  fields: {
    project?: {
      id?: string;
    };
    summary?: string;
    issuetype?: {
      name?: string;
    };
    assignee?: {
      accountId?: string;
    };
    reporter?: {
      name?: string;
    };
    labels?: string[];
  };
}

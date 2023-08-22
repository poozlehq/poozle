/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { TicketTag } from '@poozle/engine-idk';
import { createBody, TicketWithRaw } from './ticket.interface';

export function convertTicket(data: any): TicketWithRaw {
  return {
    id: data.id,
    name: data.subject,
    organization_id: data.organization_id ? data.organization_id : '',
    description: data.description,
    status: data.status,
    created_at: data.created_at,
    updated_at: data.updated_at,
    created_by: data.submitter_id,
    type: data.type,
    assignees: [
      {
        id: data.assignee_id,
        username: '',
      },
    ],
    ticket_url: data.url,
    tags: data.tags?.map((lab: any) => ({
      id: '',
      name: lab.name,
    })),

    // Extra fields
    parent_id: '',
    priority: data.priority,
    due_date: '',
    completed_at: '',
    collection_id: '',

    raw: data,
  };
}

export function convertCreateUpdateBody(data: createBody) {
  return {
    ticket: {
      subject: data.name,
      organization_id: data.account_id,
      status: data.status,
      ...(data.tags
        ? {
            tags: data.tags
              .filter((tag: TicketTag) => tag.name)
              .map((tag: TicketTag) => {
                return tag.name;
              }),
          }
        : {}),
      ...(data.priority ? { priority: data.priority } : {}),
      ...(data.type ? { priority: data.type } : {}),
      ...(data.assignees ? { assignee_id: data.assignees[0].id } : {}),
    },
  };
}

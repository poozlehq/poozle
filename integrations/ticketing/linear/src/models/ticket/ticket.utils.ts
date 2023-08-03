/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Ticket } from '@poozle/engine-idk';

export function convertTicket(data: any): Ticket {
  return {
    id: data.number,
    name: data.title,
    collection_id: '',
    description: data.description,
    status: data.state.name,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    created_by: data.user.login,
    type: 'issue',
    assignees: data.assignees.map((ass: any) => ({
      id: ass.id,
      username: ass.login,
    })),
    ticket_url: data.url,
    tags: data.labels.map((lab: any) => ({
      id: lab.id,
      name: lab.name,
    })),
    // Extra fields
    parent_id: '',
    priority: '',
    due_date: '',
    completed_at: '',
  };
}

export const ticketMappings = {
  name: 'title',
  description: 'body',
  assignees: 'assignees',
  tags: 'label',
  status: 'state',
};

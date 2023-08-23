/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Ticket } from '@poozle/engine-idk';

import { UpdateTicketResponse } from './ticket.interface';

export function convertTicket(data: any): Ticket {
  return {
    id: data.id,
    name: data.title,
    collection_id: '',
    description: data?.description,
    status: data.state?.name,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    created_by: data.creator?.name,
    type: 'issue',
    assignees: data.assignees?.map((ass: any) => ({
      id: ass.id,
      username: ass.name,
    })),
    ticket_url: data?.url,
    tags: data.labels.nodes?.map((lab: any) => ({
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

export function convertUpdateTicket(data: any): UpdateTicketResponse {
  return {
    status: data.success,
    lastSyncId: data.lastSyncId,
  };
}

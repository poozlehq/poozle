/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Ticket } from '@poozle/engine-idk';

export function convertTicket(data: any, collection_id: string | null): Ticket {
  return {
    id: data.gid,
    name: data.name,
    collection_id: collection_id ? collection_id : '',
    description: '',
    status: data.custom_fields[1].enum_value.name,
    created_at: data.created_at,
    updated_at: data.modified_at,
    created_by: data.custom_fields[1].enum_value.created_by.name,
    type: data.resource_type,
    assignees: [data.assignee.name],
    ticket_url: data.permalink_url,
    tags: data.labels.map((lab: any) => ({
      id: lab.id,
      name: lab.name,
    })),
  //
    // Extra fields
    parent_id: '',
    priority: data.custom_fields[0].enum_value.name,
    due_date: data.due_on,
    completed_at: data.completed_at,
  };
}

export const ticketMappings = {
  name: 'title',
  description: 'body',
  assignees: 'assignees',
  tags: 'label',
  status: 'state',
};

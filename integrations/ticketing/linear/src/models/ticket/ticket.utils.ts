/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { LinearIssue } from './ticket.interface';
import { convertUser } from '../user/user.utils';

export function convertTicket(data: any): LinearIssue {
  return {
    id: data.number,
    name: data.title,
    description: data.description,
    status: data.state,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
    created_by: data.creator,
    type: data.pull_request ? 'pull_request' : 'issue',
    assignee: convertUser(data.assignee),
    ticket_url: data.url,
    tags: data.labels.map((lab: any) => ({
      id: lab.id,
      name: lab.name,
    })),
    estimate: parseFloat(data.estimate),
    archived_at: data.archivedAt,
    parent_id: '',
    priority: data.priority,
    due_date: data.dueDate,
    completed_at: data.completedAt,
  };
}

export const ticketMappings = {
  name: 'title',
  description: 'body',
  assignees: 'assignees',
  tags: 'label',
  status: 'state',
};

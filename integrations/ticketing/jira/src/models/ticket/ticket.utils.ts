import { Ticket } from '@poozle/engine-edk';

export const ticketMappings = {
  name: "summary",
  description: "description",
  assignees: "assignees",
  tags: "label",
  status: "status",
  type: "issuetype"
}

export function convertTicket(data: any, collection_id: string | null): Partial<Ticket> {
  return {
    id: data.id,
    name: data.fields.summary,
    collection_id: collection_id ? collection_id : data.fields.project.id,
    description: data.fields.description,
    status: data.fields.status.name,
    created_at: data.fields.created,
    updated_at: data.fields.updated,
    created_by: data.fields.creator.displayName,
    type: data.fields.issuetype.name,
    assignees: [{id: data.fields.assignees?.accountId ,username: data.fields.assignees?.displayName}],
    ticket_url: data.self,
    parent_id: data.fields.parent?.id,
    priority: data.fields.priority.name,
    due_date: data.fields.duedate,
    tags: data.labels?.map((lab: any) => ({
      id: lab.id,
      name: lab.displayName,
    })),
  };
}


export interface CreateTicketBody {
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

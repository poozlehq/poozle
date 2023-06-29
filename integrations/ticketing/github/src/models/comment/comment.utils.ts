/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertComment(data: any) {
  return {
    id: data.id,
    ticket_id: data.issue_url.match(/\/(\d+)$/)?.[1],
    body: data.body,
    created_by_id: data.user.id,
    created_by: data.user.login,
    created_at: data.created_at,
    updated_at: data.updated_at,
    raw_data: data,
  };
}

export const commentMappings = {
  description: 'body',
};

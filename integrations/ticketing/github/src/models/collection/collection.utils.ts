/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCollection(data: any) {
  return {
    id: data.name,
    name: data.full_name,
    type: 'PROJECT',
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
    raw_data: data,
  };
}

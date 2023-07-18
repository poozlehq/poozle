/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Collection } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCollection(data: any): Collection {
  return {
    id: data.name,
    name: data.full_name,
    parent_id: '',
    type: 'PROJECT',
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

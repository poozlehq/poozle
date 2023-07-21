/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CollectionWithRaw } from './collection.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCollection(data: any): CollectionWithRaw {
  return {
    id: data.name,
    name: data.full_name,
    parent_id: '',
    type: 'PROJECT',
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,

    // Raw
    raw: data,
  };
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CollectionWithRaw } from './collection.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCollection(data: any): CollectionWithRaw {
  return {
    id: data.name,
    name: data.name,
    parent_id: '',
    type: 'PROJECT',
    description: data.description,
    created_at: data.createdAt,
    updated_at: data.updatedAt,

    raw: data,
  };
}

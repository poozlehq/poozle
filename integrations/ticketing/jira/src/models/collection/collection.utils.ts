/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { CollectionWithRaw } from './collection.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCollection(data: any): CollectionWithRaw {
  return {
    id: data.key,
    name: data.name,
    type: data.projectTypeKey,

    // extract
    parent_id: '',
    created_at: '',
    updated_at: '',
    description: '',

    // Raw
    raw: data,
  };
}

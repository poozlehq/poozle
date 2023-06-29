import { Collection } from '@poozle/engine-edk';

export function convertCollection(data: any): Partial<Collection> {
  return {
    id: data.name,
    name: data.full_name,
    type: 'PROJECT',
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}
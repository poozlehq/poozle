import { Collection } from '@poozle/engine-edk';

export function convertCollection(data: any): Partial<Collection> {
  return {
    id: data.id,
    name: data.name,
    type: data.projectTypeKey,
  };
}


import { Tag } from '@poozle/engine-edk';

export function convertTag(data: any): Partial<Tag> {
  return {
    id: data.id,
    name: data.name,
  };
}


export const tagMapping = {
    name: 'name',
    description: 'description',
    color: 'color',
  };
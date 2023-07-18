/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Tag } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTag(data: any): Tag {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    color: data.color,
  };
}

export const tagMapping = {
  name: 'name',
  description: 'description',
  color: 'color',
};

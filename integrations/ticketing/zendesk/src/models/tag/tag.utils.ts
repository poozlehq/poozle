/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { TagWithRaw } from './tag.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTag(data: any): TagWithRaw {
  return {
    id: data.name,
    name: data.name,
    description: '',
    color: '',
    raw: data,
  };
}

export const tagMapping = {
  name: 'name',
  description: 'description',
  color: 'color',
};

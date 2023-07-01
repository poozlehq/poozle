/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTag(data: any) {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    color: data.color,
    raw_data: data,
  };
}

export const tagMapping = {
  name: 'name',
  description: 'description',
  color: 'color',
};

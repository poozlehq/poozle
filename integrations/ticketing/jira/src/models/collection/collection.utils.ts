/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCollection(data: any) {
  return {
    id: data.id,
    name: data.name,
    type: data.projectTypeKey,
    raw_data: data,
  };
}

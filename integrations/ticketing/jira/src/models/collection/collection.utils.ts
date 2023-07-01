/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function convertCollection(data: any) {
  return {
    id: data.id,
    name: data.name,
    type: data.projectTypeKey,
    raw_data: data,
  };
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Tag } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertTag(data: any): Tag {
  // return {
  //   id: data.id,
  //   name: data.name,
  //   description: data.description,
  //   color: data.color,
  // };

  /** 
   * TODO: The above is a mapping we used in Github. But you need to
   * write mapping specific to the current integration
  */
}

export const tagMapping = {
  name: 'name',
  description: 'description',
  color: 'color',
};

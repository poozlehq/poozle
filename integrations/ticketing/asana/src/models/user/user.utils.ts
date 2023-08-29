/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { User } from '@poozle/engine-idk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any): User {
  return {
    id: data.gid,
    name: data.name,
    avatar: <string>Object.values(data.photo)[0],

    // Extra field
    email_address: data.email,
  };
}

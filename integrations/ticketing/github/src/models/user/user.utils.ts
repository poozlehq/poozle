/** Copyright (c) 2023, Poozle, all rights reserved. **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertUser(data: any) {
  return {
    id: data.login,
    name: data.login,
    avatar: data.avatar_url,
    raw_data: data,
  };
}

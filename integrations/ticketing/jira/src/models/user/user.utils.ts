/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function convertUser(data: any) {
  return {
    id: data.accountId,
    name: data.displayName,
    avatar: data.avatarUrls['48x48'],
    raw_data: data,
  };
}

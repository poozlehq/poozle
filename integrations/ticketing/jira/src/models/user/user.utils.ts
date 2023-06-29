import { User } from '@poozle/engine-edk';

export function convertUser(data: any): Partial<User> {
  return {
    id: data.accountId,
    name: data.displayName,
    avatar: data.avatarUrls["48x48"]
  };
}

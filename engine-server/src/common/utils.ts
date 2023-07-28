/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

export function pagination(limit: number, cursor: string) {
  const page = cursor ? parseInt(cursor) : 1;
  const parsedLimit = limit ? limit : 10;

  const offset = (page - 1) * limit;

  return { offset, limit: parsedLimit, page };
}

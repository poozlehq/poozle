/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { User } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface UserWithRaw extends User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface UsersResponse {
  data: UserWithRaw[];
  meta: Meta;
}

export interface UserResponse {
  data: UserWithRaw;
}

export interface GetUsersParams {
  queryParams: {
    limit: number;
    cursor: string;
    collection_id: string;
  };

  pathParams: {};
}

export interface GetUserParams {
  queryParams: {
    collection_id: string;
  };
  pathParams: {
    user_id: string;
  };
}

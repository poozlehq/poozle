/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { User } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface UserWithRaw extends User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
    cursor?: string;
    created_after?: string;
  };

  pathParams: {
    organization_id: string;
  };
}

export interface GetUserParams {
  queryParams: {};
  pathParams: {
    organization_id: string;
    user_id: string;
  };
}

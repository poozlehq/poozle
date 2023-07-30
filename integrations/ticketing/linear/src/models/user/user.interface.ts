/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { User } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface LinearUser extends User {
  url: string;
  created_at: string;
}

export interface UsersResponse {
  data: User[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface UserResponse {
  data: User;
}

export interface UserParams {
  user_id: string;
}

export interface UserConnection {
  data: LinearUser[];
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { User } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface UsersResponse {
  data: User[];
  meta: Meta;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface UserResponse {
  data: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export interface UserParams {
  pathParams: {
    user_gid: string
  }
}

export interface UsersParams {

}
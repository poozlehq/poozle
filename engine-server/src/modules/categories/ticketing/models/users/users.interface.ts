/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

import { QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class UserParams extends QueryParams {}

export class PathParams {
  @IsString()
  collection_id: string;
}

export class PathParamsWithUserId {
  @IsString()
  collection_id: string;

  @IsString()
  user_id: string;
}

export class User {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  photo_url: string;
  updated_at: string;
  created_at: string;
}

export class TicketingUserResponse {
  data: User;
}
export class TicketingUsersResponse {
  data: User[];
  meta: Meta;
}

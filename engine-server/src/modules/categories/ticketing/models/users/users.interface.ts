/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class ListUserParams extends QueryParams {}
export class GetUserParams extends JustRawParams {}

export class PathParams {}

export class PathParamsWithUserId {
  @IsString()
  user_id: string;
}

export class TicketingUser {
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
  data: TicketingUser;
}
export class TicketingUsersResponse {
  data: TicketingUser[];
  meta: Meta;
}

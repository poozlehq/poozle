/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

import {
  DIRECTION_ENUM,
  JustRawParams,
  QueryParams,
} from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

enum SORT_ENUM {
  'created_at' = 'created_at',
  'updated_at' = 'updated_at',
}
export class TeamQueryParams extends QueryParams {
  @IsOptional()
  @IsEnum(SORT_ENUM)
  sort?: string;

  @IsOptional()
  @IsEnum(DIRECTION_ENUM)
  direction?: string;
}

export class CommonTeamQueryParams extends JustRawParams {}

export class Member {
  id: string;
  username: string;
}

export class Team {
  id: string;
  name: string;
  description: string;
  members: Member[];
}

export class TicketingTeamsResponse {
  data: Team[];
  meta: Meta;
}

export class TicketingTeamResponse {
  data: Team;
}

export class PathParamsWithTeamName {
  @IsString()
  team_name: string;
}

export class UpdateTeamBody {
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  members?: Array<Omit<Member, 'username'>>;
}

export class CreateTeamBody {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  members?: Array<Omit<Member, 'username'>>;
}

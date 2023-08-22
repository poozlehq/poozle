/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Member {
  id: string;
  username: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: Member[];
  created_at: string;
  updated_at: string;
}

export interface CreateTeamBody {
  name: string;
  description: string;
  memberts: Array<Exclude<Member, 'username'>>;
}

export interface UpdateTeamBody {
  name: string;
  description: string;
  memberts: Array<Exclude<Member, 'username'>>;
}

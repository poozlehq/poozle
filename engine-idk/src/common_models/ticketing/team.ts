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
}

export interface createTeam {
  name: string;
  description: string;
  memberts: Array<Exclude<Member, 'username'>>;
}

export interface updateTeam {
  name: string;
  description: string;
  memberts: Array<Exclude<Member, 'username'>>;
}

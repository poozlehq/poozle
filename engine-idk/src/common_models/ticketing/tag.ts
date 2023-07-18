/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Tag {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface CreateTag {
  name: string;
  description: string;
  color: string;
}

export interface UpdateTag {
  name: string;
  description: string;
  color: string;
}

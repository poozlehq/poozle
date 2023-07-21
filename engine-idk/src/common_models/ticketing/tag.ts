/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Tag {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface CreateTagBody {
  name: string;
  description: string;
  color: string;
}

export interface UpdateTagBody {
  name: string;
  description: string;
  color: string;
}

/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Collection {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isPublic: string;
  owner: string;
  uid: string;
}

export interface Collections {
  collections: Collection[];
}

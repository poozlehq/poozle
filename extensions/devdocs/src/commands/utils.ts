/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Entry {
  name: string;
  path: string;
  type: string;
}

export interface Entries {
  entries: Entry[];
}

export interface Links {
  home?: string;
  code?: string;
}

export interface Doc {
  name: string;
  slug: string;
  type: string;
  links?: Links;
  version: string;
  release: string;
  mtime: number;
  icon: string;
}

export interface Type {
  name: string;
  count: number;
  slug: string;
}

export interface Index {
  entries: Entry[];
  types: Type[];
}

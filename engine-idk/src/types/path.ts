/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Meta {
  limit: number;
  cursors: {
    before: string;
    current: string;
    next: string;
  };
}

export interface Response {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  meta?: Meta;
  error?: string;
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApiProperty } from '@nestjs/swagger';

export interface Meta {
  items_per_page: number;
  cursors: {
    before: string;
    current: string;
    after: string;
  };
}

export class ResponseType<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  meta?: Meta;
}

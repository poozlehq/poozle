/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  limit: number;
  cursors: {
    previous: string;
    current: string;
    next: string;
  };
}

export class ResponseType<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  meta?: Meta;
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  skip?: number;

  after?: string;

  before?: string;

  first?: number;

  last?: number;
}

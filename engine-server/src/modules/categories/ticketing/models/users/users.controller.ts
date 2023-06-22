/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'ticketing/users',
})
@ApiTags('Ticketing')
export class UsersController {
  @Get()
  async getUsers() {
    return { succes: true };
  }
}

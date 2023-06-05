/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('health')
  async health() {
    return { version: process.env.ENGINE_VERSION || '' };
  }
}

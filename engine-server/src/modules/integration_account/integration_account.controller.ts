/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
  path: 'integration_account',
})
@ApiTags('Integration Account')
export class IntegrationAccountController {}

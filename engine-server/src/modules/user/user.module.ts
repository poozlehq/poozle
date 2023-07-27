/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { IntegrationDefinitionModule } from 'modules/integration_definition/integration_definition.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [IntegrationDefinitionModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

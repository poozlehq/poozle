/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Module } from '@nestjs/common';

import { IntegrationDefinitionModule } from 'modules/integration_definition/integration_definition.module';
import { UserService } from 'modules/user/user.service';
import { WorkspaceService } from 'modules/workspace/workspace.service';

import { ManagementController } from './management.controller';

@Module({
  imports: [IntegrationDefinitionModule],
  controllers: [ManagementController],
  providers: [WorkspaceService, UserService],
})
export class ManagementModule {}

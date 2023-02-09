/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExtensionDefinition } from '@prisma/client';

import {
  ExtensionDefinitionRequestIdBody,
  ExtensionDefinitionCreateBody,
} from './extension_definition.interface';
import { ExtensionDefinitionService } from './extension_definition.service';

@ApiTags('extension_definition')
@Controller('extension_definitions')
export class ExtensionDefinitionController {
  constructor(private extensionDefinitionService: ExtensionDefinitionService) {}

  @Get('list')
  async getExtensionDefinitions(): Promise<ExtensionDefinition[]> {
    return this.extensionDefinitionService.getAllExtensionDefinitions();
  }

  @Get('get')
  async getExtensionDefinitionWithId(
    @Body() extensionDefinitionRequestIdBody: ExtensionDefinitionRequestIdBody,
  ): Promise<ExtensionDefinition> {
    return this.extensionDefinitionService.getExtensionDefinitionWithId(
      extensionDefinitionRequestIdBody,
    );
  }

  @Post('create')
  async createExtensionDefinition(
    @Body() extensionDefinitionCreateBody: ExtensionDefinitionCreateBody,
  ): Promise<ExtensionDefinition> {
    return this.extensionDefinitionService.createExtensionDefinition(
      extensionDefinitionCreateBody,
    );
  }
}

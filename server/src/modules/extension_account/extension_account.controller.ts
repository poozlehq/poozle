/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExtensionAccount } from '@prisma/client';

import {
  ExtensionAccountCreateBody,
  ExtensionAccountGetRequestBody,
  ExtensionAccountRequestIdBody,
} from './extension_account.interface';
import { ExtensionAccountService } from './extension_account.service';

@ApiTags('extension_account')
@Controller('extension_accounts')
export class ExtensionAccountController {
  constructor(private extensionAccountService: ExtensionAccountService) {}

  @Get('list')
  async getExtensionAccounts(
    @Body() extensionAccountGetRequestBody: ExtensionAccountGetRequestBody,
  ): Promise<ExtensionAccount[]> {
    return this.extensionAccountService.getAllExtensionAccountsInWorkspace(
      extensionAccountGetRequestBody,
    );
  }

  @Get('get')
  async getExtensionAccountWithId(
    @Body() extensionAccountRequestIdBody: ExtensionAccountRequestIdBody,
  ): Promise<ExtensionAccount> {
    return this.extensionAccountService.getExtensionAccountWithId(
      extensionAccountRequestIdBody,
    );
  }

  @Post('create')
  async createExtensionAccount(
    @Body() extensionAccountCreateBody: ExtensionAccountCreateBody,
  ): Promise<ExtensionAccount> {
    return this.extensionAccountService.createExtensionAccount(
      extensionAccountCreateBody,
    );
  }
}

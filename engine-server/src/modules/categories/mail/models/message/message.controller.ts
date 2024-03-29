/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IntegrationType } from '@prisma/client';
import { Method, getDataFromAccount } from 'shared/integration_account.utils';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { GetIntegrationAccount } from 'common/decorators/integration_account.decorator';
import { defaultQueryParams } from 'common/interfaces/defaults.constants';

import { AuthGuard } from 'modules/auth/auth.guard';

import {
  PathParamsWithMessageId,
  ListMessagesQueryParams,
  MailMessageResponse,
  MailMessagesResponse,
  CommonMessageQueryParams,
  CreateMessageBody,
} from './message.interface';

@Controller({
  version: '1',
  path: 'mail',
})
@ApiTags('Mail')
@UseGuards(new AuthGuard())
@ApiBadRequestResponse({
  status: 400,
  type: 'string',
  description: 'Bad Request',
})
@ApiUnauthorizedResponse({
  status: 401,
  type: 'string',
  description: 'Not authorised',
})
export class MessagesController {
  @Get('messages')
  async getMessages(
    @Query() query: ListMessagesQueryParams,

    @GetIntegrationAccount(IntegrationType.MAIL)
    integrationAccount: IntegrationAccount,
  ): Promise<MailMessagesResponse> {
    const messagesResponse = await getDataFromAccount(
      integrationAccount,
      '/messages',
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {},
    );

    return messagesResponse;
  }

  @Get('messages/:message_id')
  async getMessageId(
    @Query() query: CommonMessageQueryParams,
    @Param()
    params: PathParamsWithMessageId,
    @GetIntegrationAccount(IntegrationType.MAIL)
    integrationAccount: IntegrationAccount,
  ): Promise<MailMessageResponse> {
    const messageResponse = await getDataFromAccount(
      integrationAccount,
      `/messages/${params.message_id}`,
      Method.GET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params as any,
    );

    return messageResponse;
  }

  @Post('messages')
  async sendMessage(
    @Query() query: CommonMessageQueryParams,

    @Body() createMessageBody: CreateMessageBody,
    @GetIntegrationAccount(IntegrationType.MAIL)
    integrationAccount: IntegrationAccount,
  ): Promise<MailMessageResponse> {
    const messageResponse = await getDataFromAccount(
      integrationAccount,
      `/messages`,
      Method.POST,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...defaultQueryParams, ...(query as any) },
      {},
      createMessageBody,
    );

    return messageResponse;
  }
}

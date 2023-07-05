/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'modules/auth/auth.guard';

import { BodyInterface, CallbackParams } from './oauth_callback.interface';
import { OAuthCallbackService } from './oauth_callback.service';

@Controller('oauth')
export class OAuthCallbackController {
  constructor(private oAuthCallbackService: OAuthCallbackService) {}

  @Post()
  @UseGuards(new AuthGuard())
  async getRedirectURL(@Body() body: BodyInterface) {
    return await this.oAuthCallbackService.getRedirectURL(
      body.integrationAccountName,
      body.workspaceId,
      body.integrationOAuthAppId,
      body.config ?? {},
      body.redirectURL,
    );
  }

  @Get('callback')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callback(@Query() queryParams: CallbackParams, @Res() res: any) {
    return await this.oAuthCallbackService.callbackHandler(queryParams, res);
  }
}

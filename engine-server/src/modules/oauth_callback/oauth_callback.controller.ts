/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, Res } from '@nestjs/common';

import {
  CallbackParams,
  RedirectQueryParams,
  RedirectURLParams,
} from './oauth_callback.interface';
import { OAuthCallbackService } from './oauth_callback.service';

@Controller('oauth')
export class OAuthCallbackController {
  constructor(private oAuthCallbackService: OAuthCallbackService) {}

  @Get(':workspaceSlug/:integrationOAuthAppName')
  async getRedirectURL(
    @Param() params: RedirectURLParams,
    @Query() query: RedirectQueryParams,
  ) {
    let config = {};

    try {
      if (query.config) {
        config = JSON.parse(query.config);
      }
    } catch (e) {}

    return await this.oAuthCallbackService.getRedirectURL(
      query.integrationAccountName,
      params.workspaceSlug,
      params.integrationOAuthAppName,
      config,
      query.redirectURL,
    );
  }

  @Get('callback')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callback(@Query() queryParams: CallbackParams, @Res() res: any) {
    return await this.oAuthCallbackService.callbackHandler(queryParams, res);
  }
}

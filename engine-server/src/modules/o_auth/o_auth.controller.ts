/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Controller, Get, Param, Query, Res } from '@nestjs/common';

import {
  CallbackParams,
  RedirectQueryParams,
  RedirectURLParams,
} from './o_auth.interface';
import { OAuthService } from './o_auth.service';

@Controller('oauth')
export class OAuthController {
  constructor(private oAuthService: OAuthService) {}

  @Get(':workspaceSlug/:extensionAuthName')
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

    return await this.oAuthService.getRedirectURL(
      query.extensionAccountName,
      params.workspaceSlug,
      params.extensionAuthName,
      config,
      query.redirectURL,
    );
  }

  @Get('callback')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async callback(@Query() queryParams: CallbackParams, @Res() res: any) {
    return await this.oAuthService.callbackHandler(queryParams, res);
  }
}

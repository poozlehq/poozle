import { Controller, HttpCode, Query, Body, Get, Res, Post } from '@nestjs/common';

import { WebhookService } from './webhook.service';
// import { ResponseQueryParameters } from './webhook.interface';
import { ConfigService } from '@nestjs/config';

@Controller("webhook/*")
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Callbacks for extensions
   * */
  @Get()
  @HttpCode(200)
  async getCallback(@Query() queryParameters: any, @Res() res: any) {
    await this.webhookService.callback(queryParameters);
    res.redirect(`${this.configService.get('FRONTEND_URL')}`);
  }

  @Post()
  @HttpCode(200)
  async postCallback(@Query() queryParameters: any, @Res() res: any, @Body() queryBody: any) {
    await this.webhookService.callback(queryParameters, queryBody);
    res.redirect(`${this.configService.get('FRONTEND_URL')}`);
  }
}

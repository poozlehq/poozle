/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: CallableFunction): void {
    // TODO: use this.logger.log
    console.log(
      `[API Request] ${req.method} ${req.originalUrl}: ${JSON.stringify(
        req.body,
      )}`,
    );
    next();
  }
}

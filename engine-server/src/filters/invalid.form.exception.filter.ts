/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { InvalidFormException } from '../exceptions/invalid.form.exception';

@Catch(InvalidFormException)
export class InvalidFormExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidFormException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      errors: exception.getFieldErrors(),
    });
  }
}

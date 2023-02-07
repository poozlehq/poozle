/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { BadRequestException } from '@nestjs/common';

export class InvalidFormException extends BadRequestException {
  constructor(private errors: Record<string, string>, message: string) {
    super(message);
  }

  getErrorMessage(): string {
    return this.message;
  }

  getFieldErrors(): Record<string, string> {
    return this.errors;
  }
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IntegrationType } from '@prisma/client';

import { ParseIntegrationAccountPipe } from './integration_account.pipe';

export const IntegrationAccountHeaders = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return {
      workspaceId: request.headers['workspaceid'],
      integrationAccountId: request.headers['integrationaccountid'],
    };
  },
);

export const GetIntegrationAccount = (integrationType: IntegrationType) =>
  IntegrationAccountHeaders(integrationType, ParseIntegrationAccountPipe);

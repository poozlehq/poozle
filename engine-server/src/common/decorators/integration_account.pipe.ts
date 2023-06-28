/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { IntegrationType } from '@prisma/client';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { IntegrationAccountService } from 'modules/integration_account/integration_account.service';

interface Value {
  workspaceId: string;
  integrationAccountName: string;
}

@Injectable()
export class ParseIntegrationAccountPipe implements PipeTransform {
  // inject any dependency
  constructor(private integrationAccountService: IntegrationAccountService) {}

  async transform(value: Value, metadata: ArgumentMetadata) {
    const integrationType = metadata.data;

    const integrationAccount =
      (await this.integrationAccountService.getIntegrationAccountWithIntegrationType(
        {
          workspaceId: value.workspaceId,
          integrationAccountName: value.integrationAccountName,
          integrationType: integrationType as IntegrationType,
        },
      )) as IntegrationAccount;

    return integrationAccount;
  }
}

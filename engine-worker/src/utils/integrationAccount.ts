/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Knex } from 'knex';

export interface IntegrationAccount {
  integrationAccountId: string;
  integrationDefinitionId: string;
  integrationConfiguration: Record<string, string>;
  authType: string;
  integrationAccountName: string;
  workspaceId: string;
}

export async function getIntegrationAccount(knex: Knex, integrationAccountId: string) {
  const integrationAccount = await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<IntegrationAccount>('IntegrationAccount')
    .select('*')
    .where({ integrationAccountId })
    .first();

  return integrationAccount as IntegrationAccount;
}

/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { existsSync, mkdirSync, rmdirSync, writeFileSync } from 'fs';

import yaml from 'js-yaml';
import { Knex } from 'knex';

import { IntegrationAccount, getIntegrationAccount } from './integrationAccount';
import { getWorkspace } from './workspace';

interface IntegrationDefinition {
  integrationDefinitionId: string;
  key: string;
  name: string;
  integrationType: string;
}

function getTables(integrationDefinitionType: string) {
  switch (integrationDefinitionType) {
    case 'ticketing':
      return [
        'ticketing_collection',
        'ticketing_ticket',
        'ticketing_user',
        'ticketing_team',
        'ticketing_tag',
      ];

    case 'payments':
      return ['payments_charge', 'payments_dispute'];

    default:
      return ['ticketing_collection', 'ticketing_ticket'];
  }
}

function generateSource(
  integrationAccount: IntegrationAccount,
  integrationDefinition: IntegrationDefinition,
): string {
  const integrationDefinitionType = integrationDefinition.integrationType.toLowerCase();

  const syncStartDate = (() => {
    let date;
    switch (integrationDefinitionType) {
      case 'ticketing':
        date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date.toISOString();

      case 'payments':
        date = new Date();
        date.setFullYear(date.getFullYear() - 2);
        return date.toISOString();

      default:
        date = new Date();
        date.setDate(date.getDate() - 10);
        return date.toISOString();
    }
  })();

  return yaml.dump({
    kind: 'source',
    spec: {
      name: `${integrationDefinitionType}-${integrationAccount.integrationAccountName}`,
      registry: 'github',
      path: 'poozlehq/poozle',
      version: 'v0.1.3',
      concurrency: 10000,
      tables: getTables(integrationDefinitionType),
      destinations: ['postgresql'],
      backend_options: {
        table_name: 'state_table',
        connection: '@@plugins.postgresql.connection',
      },
      spec: {
        api_key: process.env.TOKEN,
        workspace_id: integrationAccount.workspaceId,
        integration_account_id: integrationAccount.integrationAccountId,
        uid: 'github',
        start_date: syncStartDate,
        url: `${process.env.BACKEND_URL}/v1/${integrationDefinitionType}`,
      },
    },
  });
}

function generateDestination(schemaName: string): string {
  return yaml.dump({
    kind: 'destination',
    spec: {
      name: 'postgresql',
      path: 'cloudquery/postgresql',
      version: 'v5.0.1',
      write_mode: 'overwrite',
      spec: {
        connection_string: `${process.env.DATABASE_URL}?search_path=${schemaName}`,
        pgx_log_level: 'debug',
      },
    },
  });
}

export async function createSchemaIfNotExists(knex: Knex, schemaName: string) {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
}

export async function generateConfig(knex: Knex, integrationAccountId: string) {
  const integrationAccount = await getIntegrationAccount(knex, integrationAccountId);

  const integrationDefinition = await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<IntegrationDefinition>('IntegrationDefinition')
    .select('*')
    .where({ integrationDefinitionId: integrationAccount.integrationDefinitionId })
    .first();

  const workspace = await getWorkspace(knex, integrationAccount.workspaceId);

  /**
   * Create schema with workspaceId if not present
   * This is used by cloudquery while sync
   */
  await createSchemaIfNotExists(knex, workspace.slug.replace(/-/g, ''));

  const sourceContent = generateSource(
    integrationAccount,
    integrationDefinition as IntegrationDefinition,
  );

  const destinationContent = generateDestination(workspace.slug.replace(/-/g, ''));

  return `${sourceContent} \n---\n${destinationContent}`;
}

export async function saveConfig(knex: Knex, integrationAccountId: string) {
  const config = await generateConfig(knex, integrationAccountId);
  const folder = `${process.env.CONFIG_PATH}/${integrationAccountId}`;

  if (existsSync(folder)) {
    rmdirSync(folder, { recursive: true });
  }

  mkdirSync(folder, { recursive: true });
  writeFileSync(`${folder}/config.yaml`, config);
}

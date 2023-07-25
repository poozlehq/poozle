/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Knex } from 'knex';

interface Workspace {
  slug: string;
  workspaceId: string;
}

export async function getWorkspace(knex: Knex, workspaceId: string) {
  const workspace = await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<Workspace>('Workspace')
    .select('*')
    .where({ workspaceId })
    .first();

  return workspace as Workspace;
}

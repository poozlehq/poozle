/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/
import Knex from 'knex';

function getSelectKeys(SELECT_KEYS: string[], raw: boolean) {
  if (raw) {
    return [...SELECT_KEYS, 'raw'];
  }

  return SELECT_KEYS;
}

export function getBaseQuery<T>(
  workspaceName: string,
  table: string,
  where: Record<string, string>,
  SELECT_KEYS: string[],
  raw: boolean,
  join?: Record<string, string | string[]>,
) {
  const knex = Knex({
    client: 'pg',
    connection: {
      connectionString: process.env.SYNC_DATABASE_URL,
    },
  });

  let query = knex
    .withSchema(workspaceName)
    .table<T>(table)
    .select(getSelectKeys(SELECT_KEYS, raw))
    .where(where);

  if (join) {
    const joinSelectedKeys = join.selectedKeys as string[];
    query = query
      .leftJoin(
        join.tableName as string,
        `${join.tableName}.${join.joinColumn}`,
        `${table}.${join.sourceColumn}`,
      )
      .select(
        knex.raw(
          `json_build_object(${joinSelectedKeys
            .map((key: any) => `'${key}', ${join.tableName}.${key}`)
            .join(', ')}) as ${join.selectedColumnName}`,
        ),
      );
  }

  return query;
}

export async function getObjectFromDb(
  workspaceName: string,
  table: string,
  where: Record<string, string>,
  SELECT_KEYS: string[],
  raw: boolean,
) {
  const knex = Knex({
    client: 'pg',
    connection: {
      connectionString: process.env.SYNC_DATABASE_URL,
    },
  });

  const data = await knex
    .withSchema(workspaceName)
    .table(table)
    .select(getSelectKeys(SELECT_KEYS, raw))
    .where(where)
    .first();

  return {
    data,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyDateFilter(
  query: any,
  queryParams: any,
  databaseName: string,
) {
  // Conditionally apply the created_after filter if not null
  if (queryParams.created_after) {
    query = query.where(
      `${databaseName}.created_at`,
      '>=',
      queryParams.created_after,
    );
  }

  // Conditionally apply the created_before filter if not null
  if (queryParams.created_before) {
    query = query.where(
      `${databaseName}.created_at`,
      '<=',
      queryParams.created_before,
    );
  }

  // Conditionally apply the updated_after filter if not null
  if (queryParams.updated_after) {
    query = query.where(
      `${databaseName}.updated_at`,
      '>=',
      queryParams.updated_after,
    );
  }

  // Conditionally apply the updated_before filter if not null
  if (queryParams.updated_before) {
    query = query.where(
      `${databaseName}.updated_at`,
      '<=',
      queryParams.updated_before,
    );
  }

  return query;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMetaParams(data: any[], limit: number, page: number) {
  return {
    limit,
    cursors: {
      previous: (page > 1 ? page - 1 : '').toString(),
      current: page.toString(),
      next: data.length === limit ? (page + 1).toString() : '',
    },
  };
}

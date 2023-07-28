/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_QUEUE } from '../constants';

export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

interface Job {
  jobId: string;
  temporalId: string;

  integrationAccountId: string;

  status: JobStatus;

  failedMessage?: string;
  recordsSynced?: number;
  logs: string;

  updatedAt: string;
}

export async function createJob(knex: Knex, integrationAccountId: string) {
  const records = await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<Job>('Job')
    .insert({
      jobId: uuidv4(),
      status: JobStatus.RUNNING,
      integrationAccountId,
      temporalId: `${DEFAULT_QUEUE}.${integrationAccountId}`,
      updatedAt: new Date().toLocaleDateString(),
    })
    .returning(['jobId', 'temporalId', 'status']);

  return records[0];
}

export async function updateJobSuccess(
  knex: Knex,
  jobId: string,
  status: JobStatus,
  recordsSynced?: number,
) {
  return await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<Job>('Job')
    .where({ jobId })
    .update({
      status,
      recordsSynced,
    });
}

export async function updateJobFailed(
  knex: Knex,
  jobId: string,
  status: JobStatus,
  failedMessage?: string,
) {
  return await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<Job>('Job')
    .where({ jobId })
    .update({
      status,
      failedMessage,
    });
}

export async function updateJobLogs(knex: Knex, jobId: string, logs: string) {
  return await knex
    .withSchema(process.env.DB_SCHEMA as string)
    .table<Job>('Job')
    .where({ jobId })
    .update({
      logs,
    });
}

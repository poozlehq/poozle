/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ExecSyncOptionsWithStringEncoding, execSync } from 'child_process';
import { readFileSync } from 'fs';

import Knex from 'knex';

import { saveConfig } from './utils/config';
import { extractInfoFromLog } from './utils/extract';
import {
  JobStatus,
  createJob,
  updateJobFailed,
  updateJobLogs,
  updateJobSuccess,
} from './utils/job';

const knex = Knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

/**
 *
 * Create a job
 * Also generate the config and save to a yaml
 */
export async function preSync(integrationAccountId: string): Promise<string> {
  const job = await createJob(knex, integrationAccountId);

  await saveConfig(knex, integrationAccountId);

  return job.jobId;
}

/**
 * Run the cloudquery job
 */
export async function runCloudQuerySync(
  jobId: string,
  integrationAccountId: string,
): Promise<void> {
  try {
    const options: ExecSyncOptionsWithStringEncoding = {
      encoding: 'utf-8',
      stdio: 'pipe',
      cwd: '/app',
    };

    const result = execSync(
      `./cloudquery sync ${process.env.CONFIG_PATH}/${integrationAccountId}/config.yaml --log-level error --log-file-name ${process.env.CONFIG_PATH}/${integrationAccountId}/cloudquery.log`,
      options,
    );

    const logs = result.trim();

    /**
     * Extract Response of cloudquery
     */
    const response = extractInfoFromLog(logs);

    if (response) {
      const { resources, errors } = response;

      if (errors !== '0') {
        // There are errors in the sync
        await updateJobFailed(
          knex,
          jobId,
          JobStatus.FAILED,
          `There are ${errors} errors in the sync`,
        );
      } else {
        // Sync succeded
        await updateJobSuccess(knex, jobId, JobStatus.SUCCEEDED, parseInt(resources));
      }
    } else {
      // Parsing failed
      await updateJobFailed(knex, jobId, JobStatus.FAILED, 'Parsing log message failed');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await updateJobFailed(knex, jobId, JobStatus.FAILED, error.stderr.toString());
    console.error('stderr:', error.stderr.toString());

    console.error('Error code:', error.status);
    throw error;
  }
}

/**
 *
 * Take logs and save them to job logs
 */
export async function postSync(jobId: string, integrationAccountId: string) {
  const logContent = readFileSync(
    `${process.env.CONFIG_PATH}/${integrationAccountId}/cloudquery.log`,
    'utf8',
  );

  await updateJobLogs(knex, jobId, logContent);
}

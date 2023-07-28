/** Copyright (c) 2023, Poozle, all rights reserved. **/

import type * as activities from './activities';

import { proxyActivities } from '@temporalio/workflow';

const { runCloudQuerySync, preSync, postSync } = proxyActivities<typeof activities>({
  startToCloseTimeout: '90 minute',
  retry: {
    maximumAttempts: 3,
  },
});
interface Params {
  integrationAccountId: string;
}

export async function runSync({ integrationAccountId }: Params): Promise<void> {
  const jobId = await preSync(integrationAccountId);

  await runCloudQuerySync(jobId, integrationAccountId);

  await postSync(jobId, integrationAccountId);
}

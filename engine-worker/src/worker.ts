/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { NativeConnection, Worker } from '@temporalio/worker';

import * as activities from './activities';
import { DEFAULT_QUEUE } from './constants';

async function run() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
  });

  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: DEFAULT_QUEUE,
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

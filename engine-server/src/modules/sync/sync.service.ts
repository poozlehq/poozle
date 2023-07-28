/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Injectable } from '@nestjs/common';
import {
  Client,
  Connection,
  ScheduleDescription,
  ScheduleOverlapPolicy,
} from '@temporalio/client';
import ms from 'ms';
import { PrismaService } from 'nestjs-prisma';

import { IntegrationAccount } from '@@generated/integrationAccount/entities';

import { getInterval } from './sync.util';

export const DEFAULT_QUEUE = 'SYNC_QUEUE';
const OVERLAP_POLICY: ScheduleOverlapPolicy = ScheduleOverlapPolicy.ALLOW_ALL;

@Injectable()
export class SyncService {
  client: Client | null = null;

  constructor(private prismaService: PrismaService) {
    this.init();
  }

  async init() {
    const connection = await Connection.connect({
      address: process.env['TEMPORAL_ADDRESS'] || 'localhost:7233',
    });
    const client = new Client({
      connection,
    });

    this.client = client;
  }

  async initiate(integrationAccounts: IntegrationAccount[]) {
    integrationAccounts.forEach(async (integrationAccount) => {
      await this.createScheduleIfNotExist(integrationAccount);
    });
  }

  async runInitialSync(integrationAccount: IntegrationAccount) {
    const scheduleId = `${DEFAULT_QUEUE}.${integrationAccount.integrationAccountId}`;

    const scheduleHandle = this.client?.schedule.getHandle(scheduleId);
    await scheduleHandle?.trigger(OVERLAP_POLICY);
  }

  async runInitialSyncWithId(integrationAccountId: string) {
    const scheduleId = `${DEFAULT_QUEUE}.${integrationAccountId}`;

    const scheduleHandle = this.client?.schedule.getHandle(scheduleId);
    await scheduleHandle?.trigger(ScheduleOverlapPolicy.BUFFER_ALL);
  }

  async createScheduleIfNotExist(integrationAccount: IntegrationAccount) {
    const scheduleId = `${DEFAULT_QUEUE}.${integrationAccount.integrationAccountId}`;

    try {
      await this.client?.schedule.getHandle(scheduleId).describe();
    } catch (e) {
      // If we are hear that means schedule is not there
      await this.createSchedule(integrationAccount);
    }
  }

  async scheduleExists(integrationAccount: IntegrationAccount) {
    const scheduleId = `${DEFAULT_QUEUE}.${integrationAccount.integrationAccountId}`;

    try {
      await this.client?.schedule.getHandle(scheduleId).describe();
      return true;
    } catch (e) {
      // If we are hear that means schedule is not there
      return false;
    }
  }

  async createSchedule(integrationAccount: IntegrationAccount) {
    const scheduleId = `${DEFAULT_QUEUE}.${integrationAccount.integrationAccountId}`;
    const { interval, offset } = getInterval(
      integrationAccount.syncPeriod,
      new Date(),
    );

    await this.client?.schedule.create({
      scheduleId,
      spec: {
        intervals: [
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            every: interval as any,
            offset,
          },
        ],
      },
      action: {
        type: 'startWorkflow',
        workflowType: 'runSync',
        taskQueue: DEFAULT_QUEUE,
        args: [
          {
            integrationAccountId: integrationAccount.integrationAccountId,
          },
        ],
      },
    });
  }

  async updateSchedule(integrationAccount: IntegrationAccount) {
    function updateFunction(scheduleDescription: ScheduleDescription) {
      const { interval, offset } = getInterval(
        integrationAccount.syncPeriod,
        new Date(),
      );

      scheduleDescription.spec = {
        intervals: [
          {
            every: ms(interval),
            offset,
          },
        ],
      };
      return scheduleDescription;
    }

    try {
      /**
       * Create the schedule if it doesn't exist
       */
      const exists = await this.scheduleExists(integrationAccount);

      if (exists) {
        const scheduleId = `${DEFAULT_QUEUE}.${integrationAccount.integrationAccountId}`;

        const scheduleHandle = this.client?.schedule.getHandle(scheduleId);

        await scheduleHandle?.update(updateFunction);
      } else {
        await this.createSchedule(integrationAccount);
        await this.runInitialSync(integrationAccount);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteSyncSchedule(
    integrationAccount: IntegrationAccount,
  ): Promise<boolean> {
    const scheduleId = `${DEFAULT_QUEUE}.${integrationAccount.integrationAccountId}`;

    if (!this.client) {
      return false;
    }

    const workflowService = this.client?.workflowService;
    try {
      await workflowService?.deleteSchedule({
        scheduleId,
        namespace: 'default',
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getSyncSchedule(integrationAccountId: string) {
    try {
      const scheduleId = `${DEFAULT_QUEUE}.${integrationAccountId}`;

      const scheduleHandle = this.client?.schedule.getHandle(scheduleId);

      return await scheduleHandle.describe();
    } catch (e) {
      return undefined;
    }
  }

  async getJobs(integrationAccountId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: {
        integrationAccountId,
      },
      orderBy: [
        {
          updatedAt: 'asc',
        },
      ],
    });

    const schedule = await this.getSyncSchedule(integrationAccountId);

    return {
      jobs,
      schedule,
    };
  }
}

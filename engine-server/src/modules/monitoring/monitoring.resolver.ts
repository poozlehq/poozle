/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from '@generated/user/user.model';

import { UserEntity } from 'common/decorators/user.decorator';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  GeneralStats,
  StatsInput,
  OperationStats,
} from './monitoring.interface';
import { MonitoringService } from './monitoring.service';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class MonitoringResolver {
  constructor(private monitoringService: MonitoringService) {}

  @Query(() => GeneralStats)
  async getGeneralStats(
    @UserEntity() user: User,
    @Args('data')
    statsInput: StatsInput,
  ): Promise<GeneralStats> {
    return await this.monitoringService.getGeneralStats(
      user.userId,
      statsInput.workspace,
      statsInput.from,
      statsInput.to,
    );
  }

  @Query(() => OperationStats)
  async getOperations(
    @UserEntity() user: User,
    @Args('data')
    statsInput: StatsInput,
  ): Promise<OperationStats> {
    return await this.monitoringService.getOperations(
      user.userId,
      statsInput.workspace,
      statsInput.from,
      statsInput.to,
    );
  }
}

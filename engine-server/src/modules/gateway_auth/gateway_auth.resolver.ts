/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { UseGuards } from '@nestjs/common';
import { Mutation, Args, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from 'modules/auth/gql-auth.guard';

import {
  GatewayAuthToken,
  GatewayAuthTokenCreateInput,
} from './gateway_auth.interface';
import { GatewayAuthService } from './gateway_auth.service';

@Resolver(() => GatewayAuthToken)
@UseGuards(GqlAuthGuard)
export class GatewayAuthResolver {
  constructor(private gatewayAuthService: GatewayAuthService) {}

  @Mutation(() => GatewayAuthToken)
  async createGatewayAccessToken(
    @Args('data') data: GatewayAuthTokenCreateInput,
  ): Promise<GatewayAuthToken> {
    const token = await this.gatewayAuthService.createGatewayAccessToken(
      data.workspaceId,
      data.days,
    );
    return {
      token,
    };
  }
}

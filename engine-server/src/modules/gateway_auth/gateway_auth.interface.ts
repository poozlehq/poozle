/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GatewayAuthToken {
  @Field()
  token: string;
}

@InputType()
export class GatewayAuthTokenCreateInput {
  @Field()
  workspaceId: string;

  @Field({ nullable: true })
  days?: string;
}

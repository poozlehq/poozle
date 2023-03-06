/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExtensionRouterRequestIdBody {
  @Field()
  extensionRouterId: string;
}

@InputType()
export class ExtensionRouterRequestWorkspaceIdBody {
  @Field()
  workspaceId: string;
}

@InputType()
export class ExtensionRouterRequestUpdateBody {
  @Field()
  extensionRouterId: string;

  @Field()
  endpoint: string;
}

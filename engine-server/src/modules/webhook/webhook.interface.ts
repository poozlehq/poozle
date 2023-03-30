/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExtensionAuthRequestIdBody {
  @Field()
  extensionAuthId: string;
}

@InputType()
export class ExtensionAuthRequestWorkspaceIdBody {
  @Field()
  workspaceId: string;
}

@InputType()
export class ExtensionAuthCreateBody {
  @Field()
  workspaceId?: string;

  @Field()
  extensionDefinitionId: string;

  @Field()
  credential: JSON;
}

@InputType()
export class ExtensionAuthRequestUpdateBody {
  @Field()
  extensionAuthId: string;

  @Field()
  credential: JSON;
}


@InputType()
export class WebhookAuthUrlBody {
  @Field()
  extensionDefinitionId: string;

  @Field()
  workspaceId: string;

  @Field()
  extensionAccountName: string;

  @Field()
  extensionAuthId?: string
}

export type ResponseQueryParameters = {
  state: string
  code: string
}
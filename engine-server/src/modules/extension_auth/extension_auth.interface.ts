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
export class ExtensionAuthRequestWorkspaceSlugBody {
  @Field()
  slug: string;
}

@InputType()
export class ExtensionAuthCreateBody {
  @Field()
  workspaceId?: string;

  @Field()
  extensionDefinitionId: string;

  @Field()
  clientId: string;

  @Field()
  clientSecret: string;

  @Field()
  scopes: string;

  @Field()
  extensionAuthName: string;
}

@InputType()
export class ExtensionAuthRequestUpdateBody {
  @Field()
  extensionAuthId: string;

  @Field()
  clientId: string;

  @Field()
  clientSecret: string;

  @Field()
  scopes: string;

  @Field()
  extensionAuthName: string;
}

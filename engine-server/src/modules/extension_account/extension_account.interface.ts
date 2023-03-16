/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class ExtensionAccountRequestIdBody {
  @Field()
  extensionAccountId: string;
}

@InputType()
export class ExtensionAccountCreateBody {
  @Field()
  extensionDefinitionId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  extensionConfiguration?: JSON;

  @Field()
  extensionAccountName: string;

  @Field()
  workspaceId: string;
}

@InputType()
export class ExtensionAccountUpdateBody {
  @Field()
  extensionAccountId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  extensionConfiguration?: JSON;

  @Field()
  extensionAccountName: string;
}

@InputType()
export class ExtensionAccountGetRequestBody {
  @Field()
  workspaceId: string;
}

@InputType()
export class ExtensionAccountByEDGetRequestBody {
  @Field()
  workspaceId: string;

  @Field()
  extensionDefinitionId: string;
}

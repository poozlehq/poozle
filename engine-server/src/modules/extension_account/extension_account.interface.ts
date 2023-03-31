/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';
import { Workspace } from '@generated/workspace/workspace.model';

@ObjectType()
export class ExtensionAccountMasked {
  @Field(() => ID, { nullable: false })
  extensionAccountId!: string;

  @Field(() => ExtensionDefinition, { nullable: false })
  extensionDefinition?: ExtensionDefinition;

  @Field(() => String, { nullable: false })
  extensionDefinitionId!: string;

  @Field(() => Workspace, { nullable: false })
  workspace?: Workspace;

  @Field(() => String, { nullable: false })
  workspaceId!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  extensionAccountName!: string;

  @Field(() => Date, { nullable: true })
  deleted!: Date | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}

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
export class ExtensionAccountNameCheckBody {
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

/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { ExtensionDefinition } from '@generated/extension-definition/extension-definition.model';
import { Workspace } from '@generated/workspace/workspace.model';

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

@ObjectType()
export class ExtensionAuthMask {
  @Field(() => ID, { nullable: false })
  extensionAuthId!: string;

  @Field(() => String, { nullable: false })
  extensionAuthName!: string;

  @Field(() => ExtensionDefinition, { nullable: false })
  extensionDefinition?: ExtensionDefinition;

  @Field(() => String, { nullable: false })
  extensionDefinitionId!: string;

  @Field(() => String, { nullable: false })
  clientId!: string;

  @Field(() => String, { nullable: false })
  scopes!: string;

  @Field(() => Workspace, { nullable: true })
  workspace?: Workspace | null;

  @Field(() => String, { nullable: true })
  workspaceId!: string | null;

  @Field(() => Date, { nullable: true })
  deleted!: Date | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}

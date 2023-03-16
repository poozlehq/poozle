/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ExtensionType, ReleaseStage } from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class ExtensionDefinitionRequestIdBody {
  @Field()
  extensionDefinitionId: string;

  @Field()
  workspaceId: string;
}

@InputType()
export class ExtensionDefinitionRequestWorkspaceIdBody {
  @Field()
  workspaceId: string;
}

@InputType()
export class ExtensionDefinitionCreateBody {
  @Field()
  name: string;

  @Field()
  dockerImageTag: string;

  @Field()
  dockerRepository: string;

  @Field()
  workspaceId: string;

  @Field()
  extensionType: ExtensionType;

  @Field()
  releaseStage: ReleaseStage;

  @Field()
  icon: string;
}

@InputType()
export class ExtensionDefinitionUpdateBody {
  @Field()
  name: string;

  @Field()
  dockerImageTag: string;

  @Field()
  dockerRepository: string;

  @Field()
  extensionType: ExtensionType;

  @Field()
  releaseStage: ReleaseStage;

  @Field()
  icon: string;

  @Field()
  extensionDefinitionId: string;
}

@InputType()
export class ExtensionDefinitionCheckBody {
  @Field()
  extensionDefinitionId: string;

  @Field()
  workspaceId: string;

  @Field(() => GraphQLJSON)
  config: JSON;
}

@ObjectType()
export class ExtensionDefinitionSpec {
  @Field(() => GraphQLJSON)
  spec: JSON;
}

@ObjectType()
export class ExtensionDefinitionCheck {
  @Field()
  status: boolean;

  @Field()
  error: string;
}

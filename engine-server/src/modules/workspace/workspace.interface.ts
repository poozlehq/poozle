/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WorkspaceCreateBody {
  @Field()
  slug: string;
}

@InputType()
export class WorkspaceRequestIdBody {
  @Field()
  workspaceId: string;
}

@InputType()
export class WorkspaceRequestSlugBody {
  @Field()
  slug: string;
}


export type ControllerReponse = {
  status: string
}
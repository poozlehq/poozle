/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  createdAt: Date;
  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date;
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ArgsType, Field } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { GraphQLJWT } from 'graphql-scalars';

@ArgsType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  @Field(() => GraphQLJWT)
  token: string;
}

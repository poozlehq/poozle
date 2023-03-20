import { Field, InputType, ObjectType } from '@nestjs/graphql';
/** Copyright (c) 2023, Poozle, all rights reserved. **/

@InputType()
export class ChangePasswordInput {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;
}

@ObjectType()
export class BaseInformationResponse {
  @Field()
  status: boolean;
}

@InputType()
export class BaseInformationRequest {
  @Field()
  companyName: string;

  @Field()
  organisationSize: string;
}

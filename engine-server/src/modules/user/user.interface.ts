/** Copyright (c) 2023, Poozle, all rights reserved. **/

export class UpdateUserInput {
  firstname?: string;

  lastname?: string;
}

export class BaseInformationResponse {
  status: boolean;
}

export class BaseInformationRequest {
  companyName: string;

  organisationSize: string;
}

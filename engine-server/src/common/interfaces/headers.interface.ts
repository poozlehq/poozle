/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

export class HeadersType {
  @IsString()
  integrationAccountName?: string;

  @IsString()
  workspaceId: string;
}

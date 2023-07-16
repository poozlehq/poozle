/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

export class WorkspaceIdRequestBody {
  /**
   * Workspace ID of the integration accounts you want to fetch
   * @example 0a58f56e-3f59-4f4e-a8e1-a9e47aae5c3c
   */
  @IsString()
  workspaceId: string;
}

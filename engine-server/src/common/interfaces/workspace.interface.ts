/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

export class WorkspaceIdRequestBody {
  /**
   * Unique identifier used to identify all the other resources.
   * You can find this in the UI after the host and /workspaces/{workspaceId}
   * @example 0a58f56e-3f59-4f4e-a8e1-a9e47aae5c3c
   */
  @IsString()
  workspaceId: string;
}

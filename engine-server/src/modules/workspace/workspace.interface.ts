/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface WorkspaceCreateBody {
  name: string;
  email: string;
  slug: string;
}

export interface WorkspaceRequestIdBody {
  workspaceId: string;
}

export interface WorkspaceRequestSlugBody {
  slug: string;
}

/** Copyright (c) 2022, Poozle, all rights reserved. **/

export class WorkspaceCreateBody {
  slug: string;
}

export class WorkspaceUpdateBody {
  initialSetupComplete: boolean;

  workspaceId: string;
}

export class WorkspaceRequestIdBody {
  workspaceId: string;
}

export class WorkspaceRequestSlugBody {
  slug: string;
}

export interface ControllerReponse {
  status: string;
}

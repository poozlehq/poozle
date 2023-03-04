/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface ControllerBody {
  event: string;
  slug: string;
  workspaceId?: string;
  workspaceSlug?: string;
  dockerImage?: string;
}

export interface ControllerResponse {
  status: boolean;
  avaliableReplicas?: number;
}

export interface ExtensionBody {
  query: string;
  endpoint: string;
}

export interface SpecConfig {
  spec: JSON;
}

export interface getSpec {
  getSpec: SpecConfig;
}

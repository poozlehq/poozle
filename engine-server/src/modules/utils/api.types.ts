/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface ControllerBody {
  event: string;
  slug: string;
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
  variables?: Record<string, string | number | boolean>;
}

export interface SpecConfig {
  spec: JSON;
}

export interface getSpec {
  getSpec: SpecConfig;
}

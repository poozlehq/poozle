/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface AuthSpecificationGeneric {
  inputSpecification?: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any>;
  };
  headers?: Record<string, string>;
}

export interface AuthSpecificationOAuth {
  // Params that are directly supported by simple-oauth2
  token_url?: string;
  auth_mode?: string;
  authorization_url?: string;
  authorization_params?: Record<string, string>;
  token_params?: Record<string, string>;
  headers?: Record<string, string>;
  // Needed to store
  inputSpecification?: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any>;
  };
}

// Generic holder of config for integration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Config = Record<string, any>;

export interface CheckResponseType {
  status: boolean;
  error: string;
}
export type CheckResponse = Promise<CheckResponseType>;

export type AuthSupported = string[];
export interface Specification {
  authSupported: AuthSupported;
  authSpecification: Record<string, AuthSpecificationGeneric | AuthSpecificationOAuth>;
  supportedFilters: string[];
  supportedSortBy: string[];
}
export type SpecificationResponse = Promise<Specification>;

export type AuthHeaderResponse = Promise<Record<string, string | number | boolean>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Spec = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RunResponse = Promise<Record<string, any>>;

export interface Params {
  pathParams?: Record<string, string | number | boolean>;
  queryParams: Record<string, string | number | boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestBody?: Record<string, any>;
  // For proxy requests
  proxy?: boolean;
  url?: string;
}

export interface BaseIntegrationInterface {
  // Return the spec object
  spec(): SpecificationResponse;
  // Check if passed config is valid
  check(config: Config): CheckResponse;
  // Return Auth headers to send to be sent in the query
  authHeaders(config: Config): AuthHeaderResponse;
  // Return all models part of this integration
  // TODO (harshith): Return model type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  models(): any[];
  // return reponse from a path
  run(path: string, method: string, config: Config, params: Params): RunResponse;
}

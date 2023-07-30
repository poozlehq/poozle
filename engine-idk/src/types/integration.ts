/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface GenericInputSpecification {
  input_specification: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any>;
  };
}

export interface AuthSpecification extends GenericInputSpecification {
  // Params that are directly supported by simple-oauth2
  token_url?: string;
  auth_mode?: string;
  authorization_url?: string;
  authorization_params?: Record<string, string>;
  token_params?: Record<string, string>;
  refresh_params?: Record<string, string>;
  scope_seperator?: string;
  default_scopes?: string[];

  headers?: Record<string, string>;
}

// Generic holder of config for integration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Config = Record<string, any>;

export interface CheckResponseType {
  status: boolean;
  error: string;
}
export type CheckResponse = Promise<CheckResponseType>;

export interface Specification {
  auth_specification: Record<string, AuthSpecification>;
  other_inputs?: GenericInputSpecification;
}
export type SpecificationResponse = Promise<Specification>;

export type AuthHeaderResponse = Promise<Record<string, string>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Spec = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RunResponse = Promise<Record<string, any>>;

export interface Params {
  pathParams?: Record<string, string | number | boolean>;
  queryParams?: Record<string, string | number | boolean>;
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
  // Return Config with to send to be sent in the query
  authHeaders(config: Config): AuthHeaderResponse;
  // Return all paths part of this integration
  // TODO (harshith): Return part type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paths(): any[];
  // return reponse from a path
  run(
    path: string,
    method: string,
    config: Config,
    headers: Record<string, string>,
    params: Params,
  ): RunResponse;
}

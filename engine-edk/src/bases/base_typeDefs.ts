/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const typeDefs = /* GraphQL */ `
  scalar Headers
  scalar Spec
  scalar AuthCredentials
  scalar Tokens
  scalar QueryParameters
  scalar QueryBody

  type HeaderConfig {
    headers: Headers
  }

  type CheckConfig {
    status: Boolean
    error: String
  }

  type SpecConfig {
    spec: Spec
  }

  type AuthResponse {
    authUrl: String
    error: String
  }

  input AuthConfig {
    extensionAuthId: String
    workspaceId: String
    extensionAccountName: String
    credentials: AuthCredentials
  }

  input tokenConfig{
    queryParameters: QueryParameters
    queryBody: QueryBody
    credentials: AuthCredentials
  }

  type TokenResponse {
    tokens: Tokens
    error: String!
  }

  # the schema allows the following query:
  type Query {
    getSpec: SpecConfig
    getHeaders(config: CredentialsT0): HeaderConfig
    check(config: CredentialsT0): CheckConfig
    getAuthUrl(config: AuthConfig): AuthResponse
    getTokens(config: tokenConfig): TokenResponse
  }
`;

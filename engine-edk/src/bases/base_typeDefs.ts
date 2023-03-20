/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const typeDefs = /* GraphQL */ `
  scalar Headers

  type HeaderConfig {
    headers: Headers
  }

  type CheckConfig {
    status: Boolean
    error: String
  }

  type SpecConfig {
    spec: SpecT0
  }

  # the schema allows the following query:
  type Query {
    getSpec: SpecConfig
    getHeaders(config: CredentialsT0): HeaderConfig
    check(config: CredentialsT0): CheckConfig
  }
`;

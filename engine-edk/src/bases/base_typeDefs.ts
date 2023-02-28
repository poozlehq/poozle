/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const typeDefs = /* GraphQL */ `
  scalar Spec
  scalar Config
  scalar Headers

  type HeaderConfig {
    headers: Headers
  }

  type CheckConfig {
    status: Boolean
    error: String!
  }

  type SpecConfig {
    spec: Spec
  }

  # the schema allows the following query:
  type Query {
    getSpec: SpecConfig
    getHeaders(config: Config): HeaderConfig
    check(config: Config): CheckConfig
  }
`;

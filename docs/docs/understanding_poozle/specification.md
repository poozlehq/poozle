# Poozle Specification

## Goals

The Poozle Specification describes a series of standard components and all the interactions between them in order to create and connect an extension.

## Key Concepts

There are 2 major components in the Poozle Specification: Gateway and Extension. A extension is an application that is described by a series of standard files. This application extracts data from an underlying API. For example, shopify, facebook_ads, jira, github etc. The gateway combines all the extensions configured at one single layer.

## Extension

This section describes important details about the interface over extensions. It reviews parts of the interface that are the same across all extensions. It also describes some invariants for all methods in extension interfaces.

### Common Interface Methods

The following part of the interface is identical across all extensions:

```
schema(): SchemaResponse;
spec(): SpecResponse;
check(config: Config): CheckResponse;
authHeaders(config: Config): AuthHeaderResponse;
```

## Common Interface

### Schema

```
schema() -> SchemaResponse
```

The `schema` function return a complete GraphlQL schema for the extension to be used in the gateway.

#### Input:

1. none.

#### Output:

1. `schema` - a GraphQL schema loaded from schema.graphql of the extension.

### Spec

```
spec() -> SpecResponse
```

The `spec` function allows an extension to broadcast information about itself and how it can be configured.

#### Input:

1. none.

#### Output:

1. `spec` - See the [SpecResponse](#extension-specification) for more details on the spec.

### Check

```
check(Config) -> CheckResponse
```

The `check` function validates that, given a configuration, that the Extension is able to connect and access all resources that it needs in order to operate.

#### Input:

1. `config` - A configuration JSON object that has been validated using (see [ExtensionSpecification](#extension-specification) for information on `extensionSpecification`).

#### Output:

1. `check` - an [CheckResponse](#checkresponse).

### Auth Headers

```
authHeaders(Config) -> AuthHeaderResponse
```

The `authHeaders` function return the headers needed to authorise the extension API which will be used in the gateway.

#### Input:

1. `config` - A configuration JSON object that has been validated using (see [ExtensionSpecification](#extension-specification) for information on `extensionSpecification`).

#### Output:

1. `headers` - an [AuthHeaderResponse](#authheaderresponse).

## Gateway

We are very inspired from [GraphQL Mesh](https://the-guild.dev/graphql/mesh/docs). Thus Mesh acts as a gateway to connect with all the extension accounts.

## Extension Specification

The specification allows the Actor to share information about itself.

The `extensionSpecification` is [JSONSchema](https://json-schema.org) that describes what information needs to the actor for it operate. e.g. If using a Shopify Extension, the `ExtensionSpecification` would specify that a `token` and `shop_name` are required in order for the extension to function. This JSONSchema can be used to validate that the provided inputs are valid.

```json
{
  "integrationSpecification": {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Shopify Spec",
    "type": "object",
    "properties": {
      "credentials": {
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "title": "Token",
            "order": 0,
            "description": "Enter the Token",
            "secret": true
          },
          "shop_name": {
            "type": "string",
            "title": "Shop name",
            "order": 0,
            "description": "Enter the Shop name",
            "secret": true
          }
        },
        "additionalProperties": false
      }
    },
    "additionalProperties": false
  }
}
```

## Responses

### CheckResponse

The response reports whether an Extension was able to connect to its underlying API.

```json
{
  "status": true,
  "error": ""
}
```

### AuthHeaderResponse

The response returns the needed headers for authenticating the API

```json
{
  "Authorization": "Bearer "
}
```

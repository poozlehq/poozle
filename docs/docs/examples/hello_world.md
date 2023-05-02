---
title: Github Example
pageTitle: Poozle - Examples - Github
description:
---

The simplest way to explore Poozle is to use the "github" example.

<!-- You can find it in the ["examples" folder of our monorepo](https://github.com/wundergraph/wundergraph/tree/main/examples/simple). -->

This example shows the bare minimum configuration to use Poozle in your application.

## Extension configuration

## Run in playground

Next, we configure a simple Operation.

```graphql
# .wundergraph/operations/Dragons.graphql
query Dragons {
  spacex_dragons {
    name
    active
  }
}
```

## Running the application

Now, we can run the application using `npm run start` and access the generated RPC API.

```bash
curl http://localhost:9991/operations/Dragons
```

## Learn more

- [Guides](/docs/guides)

## Deploy to WunderGraph Cloud

The easiest way to deploy your WunderGraph app is to use WunderGraph Cloud.

{% deploy template="simple" /%}

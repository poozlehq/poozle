# Github Readme

This is the repository for the Github integration, written in Typescript.

### Prerequisites

**To iterate on this connector, make sure to complete this prerequisites section.**

#### Install dependencies

From this integration directory, run the following command:

```js
yarn;
```

This will install all the necessary dependencies for the integration.

### Locally running the connector

As we are still making the integration creation process better this is still a series of steps to test things out. We want to create a test suite to test certain key flows automatically.

1. Run `yarn build` command to build the integration which will create a file `github/index.js` which is the compiled
   version of the complete integration

2. We already have a test file `public/test.js` where you can write multiple testcases to test the functionality of the integration.

Examples:

```
main('SPEC', {})

main('CHECK', {
  config: {
    // Pass credentials according to configuration
  }
})
```

In case you need help reach us out in Slack.

### Publishing a new version integration

You can create a PR in our repo and we will take care of the rest.

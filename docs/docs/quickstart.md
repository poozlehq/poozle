# Quickstart: Add Poozle to your app

Follow these 4 steps to run graphQL server with Poozle in your app in 15 minutes.

## Step 1: Get your Poozle instance ready

The easiest and fastest way to get a production ready Poozle instance is with Poozle Docker compose file.

## Step 2: Configure your API/Integration

Click the "+ New Extension" button on the dashboard's `Extensions` page, it will ask you to choose the extension:

1. Find your Provider/API in the dropdown.

2. Decide what this config should be called in Poozle, we call this the `<EXTENSION-NAME>` here and the graphQL calls it the "Unique Key" and used in encapsulation. Most people pick the same name as the API, e.g. `github`.

3. Enter the details asked for the respective extension

Click "Create" and you are ready to use the APIs of this extension through the graphQL gateway.

## Step 3: Test your API using the playground

Go to Playground page by clicking on it on the left sidebar.

1. You can click on the docs button on the left side of the playground to see the API documentation

2. After which you can try writing the graphQL query and validate your usecase with the response on the right side.

3. Finally you can use the above query in your application to fetch the information from the Extension

## Step 4: Use the query back in your code

1. Get the gateway URL. Every workspace will be given a unique name which you will see below the name. For example if it is `spicy-salmon`. Then your gateway URL will be `https://gateway.poozle.dev/spicy-salmon/graphql`

2. Get the access token. You can go to settings and then in the API Keys tab you can generate a new token. After which you can use that as a header `Authorization: Bearer {token}`

3. Pass the query in the body.

Go ahead & try it! 🙌

## Need help?

If you run into any trouble whilst setting up Poozle or have any questions please do not hesitate to contact us - we are happy to help!

Please join our [Slack community](https://join.slack.com/t/poozle-community/shared_invite/zt-1pwu2hmj9-xtG~DGsW2aEWZc~QtOnVMQ) (For live discussion with the Community and Poozle team), where we are very active, and we will do our best to help you fast.

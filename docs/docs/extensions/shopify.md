# Shopify

This page contains the setup guide and reference information for the Shopify extension.

## Prerequisites

- token
- shop_name

## Setup guide

### Step 1: Set up Shopify

Create a [Shopify Account](https://shopify.com).

This connector support both: `OAuth 2.0` and `API PASSWORD` (for private applications) authentication methods.

#### Connect using `API PASSWORD` option

1. Go to `https://YOURSTORE.myshopify.com/admin/apps/private`
2. Enable private development if it isn't enabled.
3. Create a private application.
4. Select the resources you want to allow access to.
   - Note: The UI will show all possible data sources and will show errors when syncing if it doesn't have permissions to access a resource.
5. The password under the `Admin API` section is what you'll use as the `API PASSWORD` for the integration.
6. You're ready to set up Shopify in Poozle!

#### Connect using `OAuth` option

1. Give the shop_name and refresh_token
2. You're ready to set up Shopify in Poozle!

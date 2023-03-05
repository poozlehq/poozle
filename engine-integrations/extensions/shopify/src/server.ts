/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import ShopifyExtensionClass from './index';

runGateway(ShopifyExtensionClass, 8000, {
  graphiql: false,
});

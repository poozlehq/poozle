/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import TwitterExtensionClass from './index';

runGateway(TwitterExtensionClass, 8000, {
  graphiql: true,
});

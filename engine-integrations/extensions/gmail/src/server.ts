/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import GmailExtensionClass from './index';

runGateway(GmailExtensionClass, 8000, {
  graphiql: true,
});

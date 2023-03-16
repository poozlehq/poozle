/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import MagentoExtensionClass from './index';

runGateway(MagentoExtensionClass, 8000, {
  graphiql: true,
});

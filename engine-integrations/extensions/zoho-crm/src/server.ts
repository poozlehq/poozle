/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import ZohoCrmExtensionClass from './index';

runGateway(ZohoCrmExtensionClass, 8000, {
  graphiql: true,
});

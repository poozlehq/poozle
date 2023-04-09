/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import ClickupExtensionClass from './index';

runGateway(ClickupExtensionClass, 8000, {
  graphiql: true,
});

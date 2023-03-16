/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import SlackExtensionClass from './index';

runGateway(SlackExtensionClass, 8000, {
  graphiql: true,
});

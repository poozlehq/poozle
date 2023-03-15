/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import SpotifyExtensionClass from './index';

runGateway(SpotifyExtensionClass, 8000, {
  graphiql: true,
});

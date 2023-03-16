/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { runGateway } from '@poozle/engine-edk';

import YoutubeExtensionClass from './index';

runGateway(YoutubeExtensionClass, 8000, {
  graphiql: true,
});

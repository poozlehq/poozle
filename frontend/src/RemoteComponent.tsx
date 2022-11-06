/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { createRemoteComponent, createRequires } from '@paciolan/remote-component';

import { resolve } from '../remote-component.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requires = createRequires(resolve as any);

export const RemoteComponent = createRemoteComponent({ requires });

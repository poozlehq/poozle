/** Copyright (c) 2023, Poozle, all rights reserved. **/

import createLoadRemoteModule, {
  createRequires,
} from '@paciolan/remote-module-loader';

const dependencies = {
  util: require('util'),
  stream: require('stream'),
  path: require('path'),
  http: require('http'),
  https: require('https'),
  url: require('url'),
  fs: require('fs'),
  assert: require('assert'),
  tty: require('tty'),
  zlib: require('zlib'),
  events: require('events'),
  os: require('os'),
};

const requires = createRequires(dependencies);

export const loadRemoteModule = createLoadRemoteModule({ requires });

/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../gmail/index');

async function run() {
  const response = await main('RUN', {
    config: {},
    path: '/messages',
    method: 'GET',
    params: {
      queryParams: {},
      pathParams: {},
    },
  });

  console.log(response);
}

run();

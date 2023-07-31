/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../confluence/index');

async function run() {
  const response = await main('RUN', {
    path: '/blocks/621838349',
    method: 'GET',
    params: {
      queryParams: { raw: true },
      pathParams: {},
      requestBody: {},
    },
    config: {},
  });

  console.log(JSON.stringify(response));
}

run();

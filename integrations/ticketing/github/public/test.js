/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../github/index');

async function run() {
  const response = await main('RUN', {
    config: {
      authType: 'Api Key',
      api_key: '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',
      org: 'poozlehq',
    },
    path: '/tickets',
    method: 'GET',
    params: {
      queryParams: { limit: 2, raw: true },
      pathParams: { collection_id: 'engine' },
    },
  });

  console.log(response);
}

run();

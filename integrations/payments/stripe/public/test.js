/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../stripe/index');

async function run() {
  const response = await main('RUN', {
    path: '/charges',
    method: 'GET',
    params: {
      queryParams: {
        raw: false,
        limit: 10,
        created_after: '2023-08-16T00:00:00Z',
        cursor: '',
      },
      pathParams: { dispute_id: '' },
    },
    config: {
      api_key: '',
      authType: 'Api Key',
    },
  });

  console.log(JSON.stringify(response));
}

run();

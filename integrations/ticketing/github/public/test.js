/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../github/index');

async function run() {
  const response = await main('RUN', {
    path: '/tickets',
    method: 'GET',
    params: {
      queryParams: { raw: false, collection_id: '', ticket_id: '', limit: 10 },
      pathParams: {},
      requestBody: {},
    },
    config: {
      api_key: '',
      authType: 'Api Key',
      org: '',
    },
  });

  console.log(response);
}

run();

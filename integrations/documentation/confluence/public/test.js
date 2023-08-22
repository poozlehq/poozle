/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../confluence/index');

async function run() {
  const response = await main('RUN', {
    path: '/blocks/621838349',
    method: 'GET',
    params: {
      queryParams: {
        raw: false,
      },
      pathParams: { parent_id: '621838349', page_id: '621838349' },
    },
    config: {
      email_id: '',
      confluence_domain: '',
      api_key: '',
      authType: 'Api Key',
    },
  });

  console.log(response);
}

run();

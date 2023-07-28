/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../notion/index');

async function run() {
  const response = await main('CHECK', {
    config: {
      authType: 'Api Key',
      api_key: '',
    },

    path: '/pages',
    method: 'GET',

    params: {
      queryParams: {},
    },
  });

  console.log(response);
}

run();

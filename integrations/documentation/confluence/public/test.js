/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../confluence/index');

async function run() {
  const response = await main('CHECK', {
    path: '/collections',
    method: 'GET',
    config: {},
    params: {
      queryParams: {
        limit: 5,
        raw: true,
      },
      pathParams: {
        ticket_id: '',
      },
    },
  });

  console.log(response);
}

run();

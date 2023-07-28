/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../jira/index');

async function run() {
  const response = await main('RUN', {
    path: '/tickets',
    method: 'GET',
    config: {
      authType: 'Api Key',
      email_id: '',
      jira_domain: '',
      api_key: '',
    },
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

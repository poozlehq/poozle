/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../jira/index');

async function run() {
  const response = await main('RUN', {
    path: '/users',
    method: 'GET',
    config: {
      api_key: '',
      email_id: '',
      authType: '',
      jira_domain: '',
    },
    params: {
      queryParams: {
        limit: 5,
        raw: false,
        collection_id: '',
        ticket_id: '',
      },
      pathParams: { comment_id: '' },
    },
  });

  console.log(response);
}

run();

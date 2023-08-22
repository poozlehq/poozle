/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../google_calendar/index');

async function run() {
  const response = await main('RUN', {
    config: {},
    path: '/available',
    method: 'POST',
    params: {
      queryParams: {},
      pathParams: {},
      requestBody: {
        start_time: '2023-08-07T10:00:00-07:00',
        end_time: '2023-08-07T10:30:00-07:00',
        timezone: 'America/Los_Angeles',
      },
    },
  });

  // console.log(response);
  console.log(JSON.stringify(response));
}

run();

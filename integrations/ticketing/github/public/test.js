/** Copyright (c) 2023, Poozle, all rights reserved. **/

const { main } = require('../github/index');

async function run() {
  const response = await main('SPEC', {});

  console.log(response);
}

run();

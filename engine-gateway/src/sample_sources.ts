/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const sampleSource = {
  name: 'sample',
  handler: {
    graphql: {
      endpoint: 'https://spacex-production.up.railway.app/',
    },
  },
  transforms: [
    {
      prefix: {
        mode: 'wrap',
        value: `sample_`,
      },
    },
    {
      encapsulate: {
        name: 'sample',
        applyTo: {
          query: true,
          mutation: true,
          subscription: true,
        },
      },
    },
  ],
};

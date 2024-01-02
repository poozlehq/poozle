/** Copyright (c) 2023, Poozle, all rights reserved. **/

/* eslint-disable dot-location */
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as readline from 'readline-sync';

const prisma = new PrismaClient();

// eslint-disable-next-line prefer-const
let retryTimes = 0;

async function waitForServerResponse(): Promise<boolean> {
  const healthUrl = `${process.env.BACKEND_HOST}/health`;

  while (retryTimes < 10) {
    try {
      const response = await axios.get(healthUrl);
      if (response.status === 200) {
        console.log('Server is healthy!');
        return true;
      }
    } catch (error) {
      console.log('Server is still starting up. Retrying in 2 second...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return false;
}

async function main() {
  // Wait for server to be up and running
  const status = await waitForServerResponse();

  if (!status) {
    console.log('Server was never up');
    console.log('Failed creating user');
    return;
  }

  const email = readline.question('Enter email: ');
  const password = readline.question('Enter password: ');
  const firstName = readline.question('Enter firstname: ');
  const lastName = readline.question('Enter lastname: ');

  const users = await prisma.user.findMany({
    where: {
      email,
    },
  });

  if (users.length > 0) {
    console.log('User already exist');
  }

  if (email && password && users.length === 0) {
    try {
      const response = await axios.post(
        `${process.env.BACKEND_HOST}/auth/signup`,
        {
          formFields: [
            {
              id: 'email',
              value: email,
            },
            {
              id: 'password',
              value: password,
            },
          ],
        },
      );

      const accessToken = response.headers['st-access-token'];

      if (!accessToken) {
        console.log('User not created');
        return;
      }

      await axios.post(
        `${process.env.BACKEND_HOST}/v1/user`,
        {
          firstname: firstName,
          lastname: lastName,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (e) {
      console.log(e);
    }

    console.log('User created');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

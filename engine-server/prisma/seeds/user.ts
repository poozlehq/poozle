/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { PrismaClient } from '@prisma/client';
import axios from 'axios';
// import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  const createDefaultUser = process.env.CREATE_DEFAULT_USER;

  const users = await prisma.user.findMany({
    where: {
      email,
    },
  });

  if (users.length > 0) {
    console.log('User already exist');
  }

  if (createDefaultUser === 'true' && email && password && users.length === 0) {
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

      await axios.post(
        `${process.env.BACKEND_HOST}/v1/user`,
        {
          firstname: process.env.USER_FIRSTNAME,
          lastname: process.env.USER_LASTNAME,
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

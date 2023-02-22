/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import { useLoginUserMutation } from 'queries/generated/graphql';

import styles from './signin.module.scss';

interface FormValues {
  email: string;
  password: string;
}

export function Signin(): ReactElement {
  const [loginUserMutation, { loading }] = useLoginUserMutation();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const onSubmit = async (values: FormValues) => {
    await loginUserMutation({
      variables: {
        data: {
          email: values.email,
          password: values.password,
        },
      },
      onCompleted: () => {
        router.replace('/home');
      },
      onError: (err: Error) => {
        form.setErrors({
          email: err.message,
        });
      },
    });
  };

  return (
    <Container className={styles.container}>
      <Title align="center" className={styles.title}>
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" className={styles.text}>
        Do not have an account yet?{' '}
        <Link href="/authentication/signup" className={styles.link}>
          Create account
        </Link>
      </Text>

      <Paper withBorder shadow="md" radius="md" className={styles.paper}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="elon@poozle.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

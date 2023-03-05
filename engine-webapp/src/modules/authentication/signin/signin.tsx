/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useLoginUserMutation } from 'queries/generated/graphql';

import { AuthenticationLayout } from 'layouts/authentication_layout';
import { LoggedInGuard } from 'wrappers/logged_in_guard';

import styles from './signin.module.scss';

interface FormValues {
  email: string;
  password: string;
}

export function Signin() {
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
        router.replace('/workspaces');
      },
      onError: (err: Error) => {
        form.setErrors({
          email: err.message,
        });
      },
    });
  };

  console.log('ehre');

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

      <Paper withBorder radius="md" className={styles.paper}>
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
          <Group position="apart" mt="lg">
            <Anchor<'a'>
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

Signin.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LoggedInGuard>
      <AuthenticationLayout>{page}</AuthenticationLayout>
    </LoggedInGuard>
  );
};

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Group,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

import { AuthenticationLayout } from 'layouts/authentication_layout';
import { LoggedInGuard } from 'wrappers/logged_in_guard';

import { useSignInMutation } from 'services';

import styles from './signin.module.scss';

interface FormValues {
  email: string;
  password: string;
}

export function Signin() {
  const router = useRouter();
  const {
    query: { redirectToPath },
  } = router;

  const { mutate: signinMutate, isLoading } = useSignInMutation({
    onSuccess: (data) => {
      if (data.status !== 'OK') {
        form.setErrors({
          email: 'Not valid credentials',
        });
      } else {
        router.replace(
          redirectToPath ? (redirectToPath as string) : '/workspaces',
        );
      }
    },
  });
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
    signinMutate(values);
  };

  return (
    <Container className={styles.container}>
      <Title align="center" className={styles.title}>
        Welcome back!
      </Title>

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
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
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

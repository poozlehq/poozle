/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Title, Text, Select, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import styles from './welcome_form.module.scss';

const INDUSTRIES = ['SaaS', 'App', 'E-Commerce', 'Development Agency', 'Other'];
const ORGANISATION_SIZE = ['1-5', '6-25', '26-150', '150+'];

interface WelcomeFormProps {
  next: () => void;
}

export function WelcomeForm({ next }: WelcomeFormProps) {
  const form = useForm({
    initialValues: {
      industry: '',
      organisationSize: '',
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title order={6}>Let's start with a few questions</Title>

        <Text size="sm">
          Your answer will help us tailor the onboarding just for you.
        </Text>
      </div>

      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          next();
        })}
      >
        <div className={styles.form}>
          <Select
            className={styles.select}
            label="What industry do you work in?"
            data={INDUSTRIES}
            {...form.getInputProps('industry')}
          />
          <Select
            className={styles.select}
            label="What size is your organization?"
            data={ORGANISATION_SIZE}
            {...form.getInputProps('organisationSize')}
          />

          <Group position="right" pt="md">
            <Button type="submit">Next</Button>
          </Group>
        </div>
      </form>
    </div>
  );
}

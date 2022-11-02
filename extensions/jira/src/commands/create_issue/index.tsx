import { TextInput, Checkbox, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import * as React from 'react';

const CreateIssue = (): React.ReactElement => {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default CreateIssue;

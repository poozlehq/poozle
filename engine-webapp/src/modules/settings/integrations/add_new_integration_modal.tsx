/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  IntegrationType,
  IntegrationTypeSelectData,
} from 'lib/integration_type';
import { useRouter } from 'next/router';
import React from 'react';

import { useCreateIntegrationDefinitionMutation } from 'services/integration_definition';

interface AddNewIntegrationModalProps {
  opened: boolean;
  onClose: () => void;
}
interface Values {
  name: string;
  sourceUrl: string;
  integrationType: IntegrationType;
}

export function AddNewIntegrationModal({
  opened,
  onClose,
}: AddNewIntegrationModalProps) {
  const {
    query: { workspaceId },
  } = useRouter();
  const form = useForm({
    initialValues: {
      name: '',
      sourceUrl: '',
      integrationType: '',
    },
  });
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const { mutate: createIntegrationDefinition } =
    useCreateIntegrationDefinitionMutation({
      onSuccess: () => {
        onClose();
      },
      onError: (e) => {
        setErrorMessage(e);
      },
    });

  const onSubmit = (values: Values) => {
    createIntegrationDefinition({
      ...values,
      workspaceId: workspaceId as string,
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add new integration">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          pb="md"
          label="Integration definition name"
          placeholder="Enter integration definition name"
          {...form.getInputProps('name')}
        />
        <TextInput
          pb="md"
          label="Source URL"
          placeholder="Source URL for the integration "
          {...form.getInputProps('sourceUrl')}
        />
        <Select
          pb="md"
          data={Object.keys(IntegrationType).map((value) => ({
            label: IntegrationTypeSelectData[value as IntegrationType],
            value,
          }))}
          label="Choose integration type"
          placeholder="Choose integration type"
          {...form.getInputProps('integrationType')}
        />
        {errorMessage && (
          <Alert
            color="red"
            mt="md"
            icon={<IconAlertCircle size="1rem" />}
            title="Error!"
          >
            {<>{errorMessage}</>}
          </Alert>
        )}
        <Group pt="xl" position="right">
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Modal>
  );
}

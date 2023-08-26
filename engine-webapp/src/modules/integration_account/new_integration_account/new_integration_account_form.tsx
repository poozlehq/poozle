/* eslint-disable dot-location */
/* eslint-disable prettier/prettier */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { Alert, Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Specification } from '@poozle/engine-idk';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import * as React from 'react';

import {
  useCheckCredentialsMutation,
  useCreateIntegrationAccountMutation,
} from 'services/integration_account';
import { useGetIntegrationDefinitionSpecQuery } from 'services/integration_definition/get_spec_for_integration_definition';

import { Loader } from 'components';

import styles from './new_integration_account_form.module.scss';
import {
  getAllInputProperties,
  getInitialValues,
  getPropertyName,
} from './new_integration_account_form_utils';

interface NewIntegrationFormProps {
  integrationDefinition: IntegrationDefinition;
  workspaceId: string;
  integrationAccountNameDefault?: string;
  onComplete?: () => void;
}

interface FormProps {
  spec: Specification;
  workspaceId: string;
  onComplete?: () => void;
  integrationAccountNameDefault?: string;
  integrationDefinition: IntegrationDefinition;
}

export function Form({
  spec,
  workspaceId,
  integrationAccountNameDefault,
  integrationDefinition,
  onComplete,
}: FormProps) {
  const form = useForm({
    initialValues: getInitialValues(spec, integrationAccountNameDefault),
  });
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const { mutate: checkCredentials, isLoading: checkIsLoading } =
    useCheckCredentialsMutation({
      onSuccess: (data) => {
        if (data.status) {
          onSubmit(form.values);
          setErrorMessage(undefined);
        } else {
          setErrorMessage(data?.error);
        }
      },
    });

  const { mutate: createIntegrationAccount, isLoading: createIsLoading } =
    useCreateIntegrationAccountMutation({
      onSuccess: (data) => {
        onComplete && onComplete();
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `Integration account ${data.integrationAccountName} is created`,
        });
        form.reset();
      },
      onError: (err) => {
        setErrorMessage(err);
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    createIntegrationAccount({
      integrationDefinitionId: integrationDefinition.integrationDefinitionId,
      workspaceId,
      config: values[getPropertyName(values.authType)],
      authType: values.authType,
      integrationAccountName: values.integrationAccountName,
    });
  };

  const properties = form.values.authType
    ? getAllInputProperties(spec, form.values.authType)
    : [];

  return (
    <Group p="md" pt={0} className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          const authType = values.authType;

          checkCredentials({
            workspaceId: workspaceId as string,
            integrationDefinitionId:
              integrationDefinition.integrationDefinitionId,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            config: values[getPropertyName(authType)],
            authType,
          });
        })}
      >
        <TextInput
          pb="md"
          label="Integration account name"
          placeholder="Enter integration account name"
          disabled={checkIsLoading || createIsLoading}
          {...form.getInputProps('integrationAccountName')}
        />

        <Select
          pb="md"
          data={Object.keys(spec.auth_specification)}
          label="Choose authentication type"
          placeholder="Choose authentication type"
          disabled={checkIsLoading || createIsLoading}
          {...form.getInputProps('authType')}
        />

        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            label={property.title}
            placeholder={`Enter ${property.title}`}
            disabled={checkIsLoading || createIsLoading}
            {...form.getInputProps(
              `${getPropertyName(form.values.authType)}.${property.key}`,
            )}
          />
        ))}

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
          <Button type="submit" loading={createIsLoading || checkIsLoading}>
            Create
          </Button>
        </Group>
      </form>
    </Group>
  );
}

export function NewIntegrationForm({
  integrationDefinition,
  workspaceId,
  integrationAccountNameDefault,
  onComplete,
}: NewIntegrationFormProps) {
  const {
    data: integrationDefinitionSpec,
    isLoading,
    error,
  } = useGetIntegrationDefinitionSpecQuery({
    integrationDefinitionId: integrationDefinition.integrationDefinitionId,
    workspaceId: workspaceId as string,
  });

  if (error) {
    return (
      <Group p="lg" grow>
        <Alert
          color="red"
          mt="md"
          icon={<IconAlertCircle size="1rem" />}
          title="Error!"
        >
          {error.message}
        </Alert>
      </Group>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      spec={integrationDefinitionSpec as any}
      workspaceId={workspaceId as string}
      onComplete={onComplete}
      integrationDefinition={integrationDefinition}
      integrationAccountNameDefault={integrationAccountNameDefault}
    />
  );
}

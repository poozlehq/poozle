/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useCheckCredentialsMutation,
  useCreateIntegrationAccountMutation,
} from 'services/integration_account';
import {
  AuthSpecificationGeneric,
  Specification,
  useGetIntegrationDefinitionSpecQuery,
} from 'services/integration_definition/get_spec_for_integration_definition';

import { Loader } from 'components';

import styles from './new_integration_form.module.scss';
import {
  OAuthInputSpec,
  getInitialValues,
  getProperties,
  getPropertyName,
} from './new_integration_form_utils';

interface NewIntegrationFormProps {
  integrationDefinitionId: string;
  onComplete?: () => void;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Specification;
  workspaceId: string;
  onComplete?: () => void;
  integrationDefinitionId: string;
}

export function Form({
  spec,
  workspaceId,
  integrationDefinitionId,
  onComplete,
}: FormProps) {
  const form = useForm({
    initialValues: getInitialValues(spec),
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
      onSuccess: () => {
        onComplete();
        form.reset();
      },
      onError: (err) => {
        setErrorMessage(err);
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    createIntegrationAccount({
      integrationDefinitionId,
      workspaceId,
      config: values[getPropertyName(values.authType)],
      authType: values.authType,
      integrationAccountName: values.integrationAccountName,
    });
  };

  const properties = form.values.authType
    ? getProperties(
        form.values.authType === 'OAuth2'
          ? OAuthInputSpec
          : (
              spec.authSpecification[
                form.values.authType
              ] as AuthSpecificationGeneric
            ).inputSpecification,
      )
    : [];

  return (
    <Group p="md" pt={0} className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          const authType = values.authType;

          checkCredentials({
            workspaceId: workspaceId as string,
            integrationDefinitionId,
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
          data={spec.authSupported}
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
  integrationDefinitionId,
  onComplete,
}: NewIntegrationFormProps) {
  const {
    query: { workspaceId },
  } = useRouter();
  const {
    data: integrationDefinitionSpec,
    isLoading,
    error,
  } = useGetIntegrationDefinitionSpecQuery({
    integrationDefinitionId,
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
      spec={integrationDefinitionSpec}
      workspaceId={workspaceId as string}
      onComplete={onComplete}
      integrationDefinitionId={integrationDefinitionId}
    />
  );
}

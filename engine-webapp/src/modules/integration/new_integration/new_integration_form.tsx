/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    const integrationAccountName = values.integrationAccountName;
    const authType = values.authType;
    delete values['integrationAccountName'];
    delete values['authType'];
  };

  console.log(form.values.authType);

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
          console.log(values);
        })}
      >
        <TextInput
          pb="md"
          label="Integration account name"
          placeholder="Enter integration account name"
          {...form.getInputProps('integrationAccountName')}
        />

        <Select
          pb="md"
          data={spec.authSupported}
          label="Choose authentication type"
          placeholder="Choose authentication type"
          {...form.getInputProps('authType')}
        />

        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            label={property.title}
            placeholder={`Enter ${property.title}`}
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
          <Button type="submit">Create</Button>
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

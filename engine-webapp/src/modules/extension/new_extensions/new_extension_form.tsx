/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useCreateExtensionAccountMutation,
  useSpecForExtensionDefinitionQuery,
  useValidateCredentialsForExtensionLazyQuery,
} from 'queries/generated/graphql';

import { Loader } from 'components';

import styles from './new_extension_form.module.scss';
import {
  OAuthInputSpec,
  getInitialValues,
  getProperties,
  getPropertyName,
} from './new_extension_form_utils';

interface NewIntegrationFormProps {
  extensionDefinitionId: string;
  onComplete?: () => void;
}

interface Spec {
  auth_supported: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth_specification: Record<string, any>;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Spec;
  workspaceId: string;
  onComplete?: () => void;
  extensionDefinitionId: string;
}

export function Form({
  spec,
  workspaceId,
  extensionDefinitionId,
  onComplete,
}: FormProps) {
  const [authType, setAuthType] = React.useState(spec.auth_supported[0]);
  const form = useForm({
    initialValues: getInitialValues(
      authType,
      spec.auth_specification[authType],
    ),
  });
  const [validateCredentialsForExtension, { loading: validateLoading }] =
    useValidateCredentialsForExtensionLazyQuery();
  const [createExtensionAccount, { loading }] =
    useCreateExtensionAccountMutation();
  const [errorMessage, setErrorMessage] = React.useState(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    const extensionAccountName = values.extensionAccountName;
    const authType = values.authType;
    delete values['extensionAccountName'];
    delete values['authType'];

    createExtensionAccount({
      variables: {
        extensionCreateBody: {
          extensionDefinitionId,
          workspaceId,
          extensionAccountName,
          authType,
          extensionConfiguration: values[getPropertyName(authType)],
        },
      },
      onCompleted: () => {
        notifications.show({
          title: 'Extension',
          color: 'green',
          variant: 'filled',
          message: 'Extension successfully created',
        });
        form.reset();
        onComplete && onComplete();
      },
    });
  };

  const properties = form.values.authType
    ? getProperties(
        form.values.authType === 'OAuth2'
          ? OAuthInputSpec
          : spec.auth_specification[form.values.authType].input_specification,
      )
    : [];

  return (
    <Group p="md" pt={0} className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          validateCredentialsForExtension({
            variables: {
              workspaceId,
              extensionDefinitionId,
              config: {
                ...values,
              },
            },
            onCompleted: (data) => {
              if (data.validateExtensionCredentials.status === false) {
                setErrorMessage('Account credentials are invalid');
                setTimeout(() => setErrorMessage(undefined), 5000);
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSubmit(values as any);
              }
            },
          });
        })}
      >
        <TextInput
          pb="md"
          disabled={loading || validateLoading}
          label="Extension account name"
          placeholder="Enter extension account name"
          {...form.getInputProps('extensionAccountName')}
        />

        <Select
          pb="md"
          data={spec.auth_supported}
          disabled={loading || validateLoading}
          label="Choose authentication type"
          placeholder="Choose authentication type"
          {...form.getInputProps('authType')}
        />

        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            disabled={loading || validateLoading}
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
          <Button type="submit" loading={validateLoading || loading}>
            Create
          </Button>
        </Group>
      </form>
    </Group>
  );
}

export function NewExtensionForm({
  extensionDefinitionId,
  onComplete,
}: NewIntegrationFormProps) {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data, loading, error } = useSpecForExtensionDefinitionQuery({
    variables: {
      extensionDefinitionId,
      workspaceId: workspaceId as string,
    },
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

  if (loading) {
    return <Loader />;
  }

  return (
    <Form
      spec={data.getSpecForExtensionDefinition.spec}
      workspaceId={workspaceId as string}
      onComplete={onComplete}
      extensionDefinitionId={extensionDefinitionId}
    />
  );
}

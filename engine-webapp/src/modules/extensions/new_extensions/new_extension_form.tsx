/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useCreateExtensionAccountMutation,
  useSpecForExtensionDefinitionQuery,
  useValidateCredentialsForExtensionLazyQuery,
} from 'queries/generated/graphql';

import { Loader } from 'components';

import styles from './new_extension_form.module.scss';
import { getInitialValues, getProperties } from './new_extension_form_utils';

interface NewIntegrationFormProps {
  extensionDefinitionId: string;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any;
  workspaceId: string;
  extensionDefinitionId: string;
}

interface Values {
  api_key: string;
  extensionAccountName: string;
}

export function Form({ spec, workspaceId, extensionDefinitionId }: FormProps) {
  const form = useForm({
    initialValues: getInitialValues(spec),
  });
  const [validateCredentialsForExtension, { loading: validateLoading }] =
    useValidateCredentialsForExtensionLazyQuery();
  const [createExtensionAccount, { loading }] =
    useCreateExtensionAccountMutation();
  const [errorMessage, setErrorMessage] = React.useState(undefined);

  const onSubmit = (values: Values) => {
    const extensionAccountName = values.extensionAccountName;
    delete values['extensionAccountName'];

    createExtensionAccount({
      variables: {
        extensionCreateBody: {
          extensionDefinitionId,
          workspaceId,
          extensionAccountName,
          extensionConfiguration: values,
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
      },
    });
  };

  const properties = getProperties(spec);

  return (
    <Group p="md" pt={0} className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          console.log(values);
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
        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            disabled={loading || validateLoading}
            label={property.title}
            placeholder={`Enter ${property.title}`}
            {...form.getInputProps(property.key)}
          />
        ))}

        {errorMessage && (
          <Alert color="red" mt="md">
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
}: NewIntegrationFormProps) {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data, loading } = useSpecForExtensionDefinitionQuery({
    variables: {
      extensionDefinitionId,
      workspaceId: workspaceId as string,
    },
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Form
      spec={data.getSpecForExtensionDefinition.spec}
      workspaceId={workspaceId as string}
      extensionDefinitionId={extensionDefinitionId}
    />
  );
}

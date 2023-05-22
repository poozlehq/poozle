/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  ExtensionAccount,
  useSpecForExtensionDefinitionQuery,
  useUpdateExtensionAccountMutation,
  useValidateCredentialsForExtensionLazyQuery,
} from 'queries/generated/graphql';

import { Loader } from 'components';

import styles from './update_extension_form.module.scss';
import { getInitialValues } from './update_extension_form_utils';
import {
  getProperties,
  getPropertyName,
} from '../new_extensions/new_extension_form_utils';

interface UpdateExtensionFormProps {
  extensionAccount: ExtensionAccount;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any;
  workspaceId: string;
  extensionAccount: ExtensionAccount;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>;

export function Form({ spec, workspaceId, extensionAccount }: FormProps) {
  const form = useForm({
    initialValues: getInitialValues(spec, extensionAccount),
  });

  const [validateCredentialsForExtension, { loading: validateLoading }] =
    useValidateCredentialsForExtensionLazyQuery();
  const [updateExtensionAccount, { loading: updateLoading }] =
    useUpdateExtensionAccountMutation();

  const onSubmit = (values: Values) => {
    const extensionAccountName = values.extensionAccountName;
    const authType = values.authType;

    delete values['extensionAccountName'];
    delete values['authType'];

    updateExtensionAccount({
      variables: {
        extensionUpdateBody: {
          extensionAccountId: extensionAccount.extensionAccountId,
          extensionAccountName,
          authType,
          extensionConfiguration: values[getPropertyName(authType)],
        },
      },
      onCompleted: () => {
        notifications.show({
          title: 'Extension',
          color: 'red',
          variant: 'filled',
          message: 'Successfully updated!',
        });
      },
      onError: (error) => {
        notifications.show({
          title: 'Error',
          color: 'red',
          variant: 'filled',
          message: error.message,
        });
      },
    });
  };

  const properties = getProperties(spec);

  return (
    <Group p="md" className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          validateCredentialsForExtension({
            variables: {
              workspaceId,
              extensionDefinitionId: extensionAccount.extensionDefinitionId,
              config: {
                ...values,
              },
            },
            onCompleted: (data) => {
              if (data.validateExtensionCredentials.status === false) {
                notifications.show({
                  title: 'Error',
                  color: 'red',
                  variant: 'filled',
                  message: 'Invalid credentials',
                });
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSubmit(values as any);
              }
            },
            onError: (error) => {
              notifications.show({
                title: 'Error',
                color: 'red',
                variant: 'filled',
                message: error.message,
              });
            },
          });
        })}
      >
        <TextInput
          pb="md"
          disabled={validateLoading || updateLoading}
          description="This is used as an encapsulation in the graphql gateway"
          label="Extension account name"
          placeholder="Enter extension account name"
          {...form.getInputProps('extensionAccountName')}
        />
        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            disabled={validateLoading || updateLoading}
            label={property.title}
            description={property.description}
            placeholder={`Enter ${property.title}`}
            {...form.getInputProps(property.key)}
          />
        ))}

        <Group pt="xl" position="right">
          <Button type="submit" loading={validateLoading || updateLoading}>
            Update
          </Button>
        </Group>
      </form>
    </Group>
  );
}

export function UpdateExtensionForm({
  extensionAccount,
}: UpdateExtensionFormProps) {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data, loading, error } = useSpecForExtensionDefinitionQuery({
    variables: {
      extensionDefinitionId: extensionAccount.extensionDefinitionId,
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

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title order={6}>Update the extension configuration</Title>
      </div>

      <Form
        spec={data.getSpecForExtensionDefinition.spec}
        extensionAccount={extensionAccount}
        workspaceId={workspaceId as string}
      />
    </div>
  );
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  ExtensionAccount,
  useSpecForExtensionDefinitionQuery,
  useValidateCredentialsForExtensionLazyQuery,
} from 'queries/generated/graphql';

import { Loader } from 'components';

import styles from './update_extension_form.module.scss';
import { getInitialValues, getProperties } from './update_extension_form_utils';

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
  const [errorMessage, setErrorMessage] = React.useState(undefined);

  const onSubmit = (values: Values) => {
    delete values['extensionAccountName'];
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
                setErrorMessage('Account credentials are invalid');
                setTimeout(() => setErrorMessage(undefined), 100000);
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
          disabled={validateLoading}
          label="Extension account name"
          placeholder="Enter extension account name"
          {...form.getInputProps('extensionAccountName')}
        />
        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            disabled={validateLoading}
            label={property.title}
            placeholder={`Enter ${property.title}`}
            {...form.getInputProps(property.key)}
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
          <Button type="submit" loading={validateLoading}>
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
    <Form
      spec={data.getSpecForExtensionDefinition.spec}
      extensionAccount={extensionAccount}
      workspaceId={workspaceId as string}
    />
  );
}

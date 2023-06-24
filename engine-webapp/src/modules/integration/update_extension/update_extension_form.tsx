/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Alert, Button, Group, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  IntegrationAccount,
  useSpecForIntegrationDefinitionQuery,
  useUpdateIntegrationAccountMutation,
  useValidateCredentialsForIntegrationLazyQuery,
} from 'queries/generated/graphql';

import { Loader } from 'components';

import styles from './update_integration_form.module.scss';
import { getInitialValues } from './update_integration_form_utils';
import {
  getProperties,
  getPropertyName,
} from '../new_integrations/new_integration_form_utils';

interface UpdateIntegrationFormProps {
  integrationAccount: IntegrationAccount;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any;
  workspaceId: string;
  integrationAccount: IntegrationAccount;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>;

export function Form({ spec, workspaceId, integrationAccount }: FormProps) {
  const form = useForm({
    initialValues: getInitialValues(spec, integrationAccount),
  });

  const [validateCredentialsForIntegration, { loading: validateLoading }] =
    useValidateCredentialsForIntegrationLazyQuery();
  const [updateIntegrationAccount, { loading: updateLoading }] =
    useUpdateIntegrationAccountMutation();

  const onSubmit = (values: Values) => {
    const integrationAccountName = values.integrationAccountName;
    const authType = values.authType;

    delete values['integrationAccountName'];
    delete values['authType'];

    updateIntegrationAccount({
      variables: {
        integrationUpdateBody: {
          integrationAccountId: integrationAccount.integrationAccountId,
          integrationAccountName,
          authType,
          integrationConfiguration: values[getPropertyName(authType)],
        },
      },
      onCompleted: () => {
        notifications.show({
          title: 'Integration',
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
          validateCredentialsForIntegration({
            variables: {
              workspaceId,
              integrationDefinitionId:
                integrationAccount.integrationDefinitionId,
              config: {
                ...values,
              },
            },
            onCompleted: (data) => {
              if (data.validateIntegrationCredentials.status === false) {
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
          label="Integration account name"
          placeholder="Enter integration account name"
          {...form.getInputProps('integrationAccountName')}
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

export function UpdateIntegrationForm({
  integrationAccount,
}: UpdateIntegrationFormProps) {
  const {
    query: { workspaceId },
  } = useRouter();
  const { data, loading, error } = useSpecForIntegrationDefinitionQuery({
    variables: {
      integrationDefinitionId: integrationAccount.integrationDefinitionId,
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
        <Title order={6}>Update the integration configuration</Title>
      </div>

      <Form
        spec={data.getSpecForIntegrationDefinition.spec}
        integrationAccount={integrationAccount}
        workspaceId={workspaceId as string}
      />
    </div>
  );
}

/* eslint-disable dot-location */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities';
import {
  ActionIcon,
  Alert,
  Button,
  CopyButton,
  Group,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Specification } from '@poozle/engine-idk';
import { IconAlertCircle, IconCheck, IconCopy } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import * as React from 'react';

import {
  useCheckCredentialsMutation,
  useUpdateIntegrationAccountMutation,
} from 'services/integration_account';
import { useGetIntegrationDefinitionSpecQuery } from 'services/integration_definition';

import { Loader } from 'components';

import styles from './update_integration_account_form.module.scss';
import { getInitialValues } from './update_integration_account_form_utils';
import {
  getAllInputProperties,
  getPropertyName,
} from '../new_integration_account/new_integration_account_form_utils';

interface UpdateIntegrationFormProps {
  integrationAccount: IntegrationAccount;
  onComplete: () => void;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Specification;
  workspaceId: string;
  onComplete: () => void;

  integrationAccount: IntegrationAccount;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>;

export function Form({
  spec,
  workspaceId,
  integrationAccount,
  onComplete,
}: FormProps) {
  const form = useForm({
    initialValues: getInitialValues(spec, integrationAccount),
  });

  const [errorMessage, setErrorMessage] = React.useState(undefined);

  const { mutate: checkCredentials, isLoading: checkIsLoading } =
    useCheckCredentialsMutation({
      onSuccess: (data) => {
        if (data.status) {
          onSubmit(form.values);
          setErrorMessage(undefined);
          onComplete();
        } else {
          setErrorMessage(data?.error);
        }
      },
    });

  const { mutate: updateIntegrationAccount, isLoading: createIsLoading } =
    useUpdateIntegrationAccountMutation({
      onSuccess: (data) => {
        form.reset();
        notifications.show({
          icon: <IconCheck />,
          title: 'Status',
          color: 'green',
          message: `Integration account ${data.integrationAccountName} is updated`,
        });
      },
      onError: (err) => {
        setErrorMessage(err);
      },
    });

  const onSubmit = (values: Values) => {
    updateIntegrationAccount({
      config: values[getPropertyName(values.authType)],
      authType: values.authType,
      integrationAccountName: values.integrationAccountName,
      integrationAccountId: integrationAccount.integrationAccountId,
    });
  };

  const properties = getAllInputProperties(spec, integrationAccount.authType);

  return (
    <Group p="md" className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          const authType = values.authType;

          checkCredentials({
            workspaceId: workspaceId as string,
            integrationDefinitionId: integrationAccount.integrationDefinitionId,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            config: values[getPropertyName(authType)],
            authType,
          });
        })}
      >
        <TextInput
          pb="md"
          disabled
          description="This is used as an unique identifier"
          label="Integration account ID"
          placeholder="Enter integration account name"
          rightSection={
            <CopyButton
              value={integrationAccount.integrationAccountId}
              timeout={2000}
            >
              {({ copied, copy }) => (
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              )}
            </CopyButton>
          }
          {...form.getInputProps('integrationAccountId')}
        />
        <TextInput
          pb="md"
          disabled
          description="This is used in the UI to find accounts"
          label="Integration account name"
          placeholder="Enter integration account name"
          {...form.getInputProps('integrationAccountName')}
        />
        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            disabled={checkIsLoading || createIsLoading}
            label={property.title}
            description={property.description}
            placeholder={`Enter ${property.title}`}
            {...form.getInputProps(
              `${getPropertyName(integrationAccount.authType)}.${property.key}`,
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
          <Button type="submit" loading={checkIsLoading || createIsLoading}>
            Update
          </Button>
        </Group>
      </form>
    </Group>
  );
}

export function UpdateIntegrationForm({
  integrationAccount,
  onComplete,
}: UpdateIntegrationFormProps) {
  const {
    query: { workspaceId },
  } = useRouter();

  const {
    data: integrationDefinitionSpec,
    isLoading,
    error,
  } = useGetIntegrationDefinitionSpecQuery({
    integrationDefinitionId: integrationAccount.integrationDefinitionId,
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

  if (isLoading || !integrationDefinitionSpec) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Form
        spec={integrationDefinitionSpec}
        integrationAccount={integrationAccount}
        workspaceId={workspaceId as string}
        onComplete={onComplete}
      />
    </div>
  );
}

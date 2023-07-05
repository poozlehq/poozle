/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { Alert, Button, Group, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import getConfig from 'next/config';
import * as React from 'react';

import styles from 'modules/integration/new_integration/new_integration_form.module.scss';
import {
  getInitialValues,
  getProperties,
  getPropertyName,
} from 'modules/integration/new_integration/new_integration_form_utils';

import { useCreateRedirectURLMutation } from 'services/callback/create_redirect_url';
import { useCreateIntegrationAccountWithLinkMutation } from 'services/integration_account';
import {
  AuthSpecificationGeneric,
  Specification,
  useGetIntegrationDefinitionSpecQuery,
} from 'services/integration_definition/get_spec_for_integration_definition';
import { useGetIntegrationOAuthAppsJustIds } from 'services/integration_oauth';

import { Loader } from 'components';

import { getValidateObject } from './public_link_utils';

interface NewIntegrationFormProps {
  integrationDefinitionId: string;
  workspaceId: string;
  integrationAccountNameDefault?: string;
  linkId: string;
  onComplete?: () => void;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Specification;
  workspaceId: string;
  onComplete?: () => void;
  integrationAccountNameDefault?: string;
  integrationDefinitionId: string;
  linkId: string;

  oAuthApp?: IntegrationOAuthApp;
}

const { publicRuntimeConfig } = getConfig();

export function Form({
  spec: initialSpec,
  integrationAccountNameDefault,
  linkId,
  oAuthApp,
  integrationDefinitionId,
  onComplete,
}: FormProps) {
  let spec = initialSpec;

  if (!oAuthApp) {
    spec = {
      authSupported: initialSpec.authSupported.filter(
        (key) => key !== 'OAuth2',
      ),
      ...initialSpec,
    };
  }

  const initialValues = getInitialValues(spec, integrationAccountNameDefault);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validate: any = getValidateObject(initialValues);

  const form = useForm({
    initialValues: getInitialValues(spec, integrationAccountNameDefault),

    validate,
  });
  const [errorMessage, setErrorMessage] = React.useState(undefined);

  const { mutate: createIntegrationAccount, isLoading: createIsLoading } =
    useCreateIntegrationAccountWithLinkMutation({
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

  const { mutate: createRedirectURL, isLoading: redirectURLLoading } =
    useCreateRedirectURLMutation({
      onSuccess: (data) => {
        console.log(data);
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    if (values.authType === 'OAuth2') {
      createRedirectURL({
        config: values['OAuth2'],
        linkId,
        integrationAccountName: values.integrationAccountName,
        redirectURL: `${publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST}/link/${linkId}`,
        integrationOAuthAppId: oAuthApp.integrationOAuthAppId,
      });
    } else {
      createIntegrationAccount({
        integrationDefinitionId,
        linkId,
        config: values[getPropertyName(values.authType)],
        authType: values.authType,
        integrationAccountName: values.integrationAccountName,
      });
    }
  };

  const properties = form.values.authType
    ? getProperties(
        (
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
          onSubmit(values);
        })}
      >
        <TextInput
          pb="md"
          label="Integration account name"
          placeholder="Enter integration account name"
          disabled={createIsLoading}
          {...form.getInputProps('integrationAccountName')}
        />

        <Select
          pb="md"
          data={spec.authSupported}
          label="Choose authentication type"
          placeholder="Choose authentication type"
          disabled={createIsLoading}
          {...form.getInputProps('authType')}
        />

        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            label={property.title}
            placeholder={`Enter ${property.title}`}
            disabled={createIsLoading}
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
          {form.values.authType === 'OAuth2' ? (
            <Button type="submit" loading={redirectURLLoading}>
              Connect
            </Button>
          ) : (
            <Button type="submit" loading={createIsLoading}>
              Create
            </Button>
          )}
        </Group>
      </form>
    </Group>
  );
}

export function NewIntegrationForm({
  integrationDefinitionId,
  workspaceId,
  integrationAccountNameDefault,
  linkId,
  onComplete,
}: NewIntegrationFormProps) {
  const {
    data: integrationDefinitionSpec,
    isLoading,
    error,
  } = useGetIntegrationDefinitionSpecQuery({
    integrationDefinitionId,
    workspaceId: workspaceId as string,
  });

  const { data: oAuthApps, isLoading: oAuthAppsLoading } =
    useGetIntegrationOAuthAppsJustIds({
      workspaceId,
    });

  if (isLoading || oAuthAppsLoading) {
    return <Loader />;
  }

  console.log(oAuthApps);
  const oAuthApp = oAuthApps.find(
    (oAuthA) => oAuthA.integrationDefinitionId === integrationDefinitionId,
  );

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

  return (
    <Form
      spec={integrationDefinitionSpec}
      workspaceId={workspaceId as string}
      onComplete={onComplete}
      linkId={linkId}
      integrationDefinitionId={integrationDefinitionId}
      integrationAccountNameDefault={integrationAccountNameDefault}
      oAuthApp={oAuthApp}
    />
  );
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { Alert, Button, Group, Select, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Specification } from '@poozle/engine-idk';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import getConfig from 'next/config';
import * as React from 'react';

import styles from 'modules/integration_account/new_integration_account/new_integration_account_form.module.scss';
import {
  getInitialValues,
  getPropertyName,
} from 'modules/integration_account/new_integration_account/new_integration_account_form_utils';

import { useCreateRedirectURLMutation } from 'services/callback/create_redirect_url';
import { useCreateIntegrationAccountWithLinkMutation } from 'services/integration_account';
import { useGetIntegrationDefinitionSpecQuery } from 'services/integration_definition/get_spec_for_integration_definition';

import { Loader } from 'components';

import {
  getAllProperties,
  getSpec,
  getValidateObject,
} from './public_link_utils';

interface NewIntegrationFormProps {
  integrationDefinition: IntegrationDefinition;
  workspaceId: string;
  integrationAccountNameDefault?: string;
  onComplete?: () => void;
  oAuthApp?: IntegrationOAuthApp;
  preferOAuth: boolean;

  // Far Parent
  linkId: string;
  redirectURL: string;
  accountIdentifier: string;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Specification;
  workspaceId: string;
  onComplete?: () => void;
  integrationAccountNameDefault?: string;
  integrationDefinition: IntegrationDefinition;
  preferOAuth: boolean;
  oAuthApp?: IntegrationOAuthApp;

  // Far Parent
  linkId: string;
  redirectURL: string;
  accountIdentifier: string;
}

const { publicRuntimeConfig } = getConfig();

export function Form({
  spec: initialSpec,
  integrationAccountNameDefault,
  linkId,
  oAuthApp,
  preferOAuth,
  integrationDefinition,
  redirectURL,
  accountIdentifier,
  onComplete,
}: FormProps) {
  const spec = getSpec(oAuthApp, initialSpec, preferOAuth);

  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const initialValues = getInitialValues(spec, integrationAccountNameDefault);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validate: any = getValidateObject(initialValues);

  const onlyOAuthSupport =
    Object.keys(spec.auth_specification).includes('OAuth2') &&
    Object.keys(spec.auth_specification).length === 1 &&
    !spec.other_inputs;

  const preferOAuthAppWithNoInputs = preferOAuth && !spec.other_inputs;

  const redirectToOAuth =
    oAuthApp && (onlyOAuthSupport || preferOAuthAppWithNoInputs);

  const form = useForm({
    initialValues: getInitialValues(spec, integrationAccountNameDefault),

    validate,
  });

  const { mutate: createRedirectURL, isLoading: redirectURLLoading } =
    useCreateRedirectURLMutation({
      onSuccess: (data) => {
        const redirectURL = data.redirectURL;

        window.parent.location.href = redirectURL;
      },
    });

  React.useEffect(() => {
    if (redirectToOAuth) {
      createRedirectURL({
        config: {},
        linkId,
        integrationAccountName: integrationAccountNameDefault,
        accountIdentifier: accountIdentifier ? accountIdentifier : undefined,
        redirectURL: redirectURL
          ? (redirectURL as string)
          : `${publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST}/link/${linkId}`,
        integrationOAuthAppId: oAuthApp.integrationOAuthAppId,
      });
    }
  }, []);

  if (redirectToOAuth) {
    return (
      <Group align="vertical" position="center" pt="lg" pb="lg">
        <Loader height={50} />
        <Text> Redirecting... </Text>
      </Group>
    );
  }

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    if (values.authType === 'OAuth2') {
      createRedirectURL({
        config: values['oauth2'],
        linkId,
        accountIdentifier: accountIdentifier as string,
        integrationAccountName: values.integrationAccountName,
        redirectURL: `${publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST}/link/${linkId}`,
        integrationOAuthAppId: oAuthApp.integrationOAuthAppId,
      });
    } else {
      createIntegrationAccount({
        integrationDefinitionId: integrationDefinition.integrationDefinitionId,
        linkId,
        accountIdentifier: accountIdentifier as string,
        config: values[getPropertyName(values.authType)],
        authType: values.authType,
        integrationAccountName: values.integrationAccountName,
      });
    }
  };

  // TODO (harshith): Fix remove the default properties here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties = getAllProperties(spec, form.values.authType);

  return (
    <Group p="md" pt={0} className={styles.formContainer}>
      <form
        className={styles.form}
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        {Object.keys(spec.auth_specification).length > 1 && (
          <Select
            pb="md"
            data={Object.keys(spec.auth_specification)}
            label="Choose authentication type"
            placeholder="Choose authentication type"
            disabled={createIsLoading}
            {...form.getInputProps('authType')}
          />
        )}

        {properties.map((property) => (
          <TextInput
            key={property.key}
            pb="md"
            label={property.title}
            description={property.description}
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
              <Text mr="xs">Connect </Text>
            </Button>
          )}
        </Group>
      </form>
    </Group>
  );
}

export function NewIntegrationForm({
  integrationDefinition,
  workspaceId,
  integrationAccountNameDefault,
  linkId,
  preferOAuth,
  oAuthApp,
  onComplete,

  redirectURL,
  accountIdentifier,
}: NewIntegrationFormProps) {
  const {
    data: integrationDefinitionSpec,
    isLoading,
    error,
  } = useGetIntegrationDefinitionSpecQuery({
    integrationDefinitionId: integrationDefinition.integrationDefinitionId,
    workspaceId: workspaceId as string,
  });

  if (isLoading) {
    return <Loader />;
  }

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
      preferOAuth={preferOAuth}
      workspaceId={workspaceId as string}
      onComplete={onComplete}
      linkId={linkId}
      integrationDefinition={integrationDefinition}
      integrationAccountNameDefault={integrationAccountNameDefault}
      oAuthApp={oAuthApp}
      accountIdentifier={accountIdentifier}
      redirectURL={redirectURL}
    />
  );
}

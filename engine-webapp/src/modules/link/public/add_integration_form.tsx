/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationDefinition } from '@@generated/integrationDefinition/entities';
import { IntegrationOAuthApp } from '@@generated/integrationOAuthApp/entities';
import { Alert, Button, Group, Select, TextInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Specification } from '@poozle/engine-idk';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import * as React from 'react';

import styles from 'modules/integration_account/new_integration_account/new_integration_account_form.module.scss';
import {
  getInitialValues,
  getPropertyName,
} from 'modules/integration_account/new_integration_account/new_integration_account_form_utils';

import { useCreateRedirectURLMutation } from 'services/callback/create_redirect_url';
import { useCreateIntegrationAccountWithLinkMutation } from 'services/integration_account';
import { useGetIntegrationDefinitionSpecQuery } from 'services/integration_definition/get_spec_for_integration_definition';

import { IntegrationIcon, Loader } from 'components';

import { getAllProperties, getValidateObject } from './public_link_utils';

interface NewIntegrationFormProps {
  integrationDefinition: IntegrationDefinition;
  workspaceId: string;
  integrationAccountNameDefault?: string;
  linkId: string;
  onComplete?: () => void;
  oAuthApp?: IntegrationOAuthApp;
  preferOAuth: boolean;
}

interface FormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Specification;
  workspaceId: string;
  onComplete?: () => void;
  integrationAccountNameDefault?: string;
  integrationDefinition: IntegrationDefinition;
  linkId: string;
  preferOAuth: boolean;
  oAuthApp?: IntegrationOAuthApp;
}

const { publicRuntimeConfig } = getConfig();

export function Form({
  spec: initialSpec,
  integrationAccountNameDefault,
  linkId,
  oAuthApp,
  preferOAuth,
  integrationDefinition,
  onComplete,
}: FormProps) {
  let spec = initialSpec;
  const {
    query: { redirectURL, accountIdentifier },
  } = useRouter();
  const [errorMessage, setErrorMessage] = React.useState(undefined);
  const initialValues = getInitialValues(spec, integrationAccountNameDefault);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validate: any = getValidateObject(initialValues);

  const onlyOAuthSupport =
    Object.keys(spec.auth_specification).includes('OAuth2') &&
    Object.keys(spec.auth_specification).length === 1;

  const form = useForm({
    initialValues: getInitialValues(spec, integrationAccountNameDefault),

    validate,
  });

  const { mutate: createRedirectURL, isLoading: redirectURLLoading } =
    useCreateRedirectURLMutation({
      onSuccess: (data) => {
        const redirectURL = data.redirectURL;

        window.location.href = redirectURL;
      },
    });

  React.useEffect(() => {
    if (oAuthApp && (onlyOAuthSupport || preferOAuth)) {
      createRedirectURL({
        config: {},
        linkId,
        integrationAccountName: integrationAccountNameDefault,
        accountIdentifier: accountIdentifier as string,
        redirectURL: redirectURL
          ? (redirectURL as string)
          : `${publicRuntimeConfig.NEXT_PUBLIC_BASE_HOST}/link/${linkId}`,
        integrationOAuthAppId: oAuthApp.integrationOAuthAppId,
      });
    }
  }, []);

  if (oAuthApp && (onlyOAuthSupport || preferOAuth)) {
    return (
      <Group align="vertical" position="center" pt="lg" pb="lg">
        <Loader height={50} />
        <Text> Redirecting... </Text>
      </Group>
    );
  }

  if (!oAuthApp) {
    const currentSpecification = initialSpec.auth_specification;
    delete currentSpecification['OAuth2'];

    spec = {
      ...initialSpec,
      auth_specification: currentSpecification,
    };
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
        config: values['OAuth2'],
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
        <Select
          pb="md"
          data={Object.keys(spec.auth_specification)}
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
    />
  );
}

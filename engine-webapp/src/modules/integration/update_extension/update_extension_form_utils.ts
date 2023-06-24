/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from 'queries/generated/graphql';

import {
  OAuthInputSpec,
  getProperties,
  getPropertyName,
} from '../new_integrations/new_integration_form_utils';

export function getInitialValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  integrationAccount: IntegrationAccount,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValues: Record<string, any> = {};

  Object.keys(spec.auth_specification).forEach((key) => {
    initialValues[getPropertyName(key)] = {};

    const specProperties = getProperties(
      key === 'OAuth2'
        ? OAuthInputSpec
        : spec.auth_specification[key].input_specification,
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specProperties.forEach((property: any) => {
      initialValues[getPropertyName(key)][property.key] = '';
    });
  });

  // Adding integrationAccountName to the initial Values
  initialValues['integrationAccountName'] =
    integrationAccount.integrationAccountName;

  // eslint-disable-next-line prefer-destructuring
  initialValues['authType'] = integrationAccount.authType;

  return initialValues;
}

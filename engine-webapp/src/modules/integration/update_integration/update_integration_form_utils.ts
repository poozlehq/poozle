/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities/integrationAccount.entity';

import {
  getProperties,
  getPropertyName,
} from '../new_integration/new_integration_form_utils';

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
      spec.auth_specification[integrationAccount.authType].input_specification,
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

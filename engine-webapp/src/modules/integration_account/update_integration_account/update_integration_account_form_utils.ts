/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities/integrationAccount.entity';
import { Specification } from '@poozle/engine-idk';

import {
  getProperties,
  getPropertyName,
} from '../new_integration_account/new_integration_account_form_utils';

export function getInitialValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Specification,
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
      initialValues[getPropertyName(key)][property.key] =
        integrationAccount.integrationConfiguration[property.key];
    });

    if (spec.other_inputs) {
      const otherProperties = getProperties(
        spec.other_inputs.input_specification,
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      otherProperties.forEach((property: any) => {
        initialValues[getPropertyName(key)][property.key] =
          integrationAccount.integrationConfiguration[property.key];
      });
    }
  });

  // Adding integrationAccountName to the initial Values
  initialValues['integrationAccountName'] =
    integrationAccount.integrationAccountName;
  initialValues['integrationAccountId'] =
    integrationAccount.integrationAccountId;

  // eslint-disable-next-line prefer-destructuring
  initialValues['authType'] = integrationAccount.authType;

  return initialValues;
}

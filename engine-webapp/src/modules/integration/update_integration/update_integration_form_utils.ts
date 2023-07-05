/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IntegrationAccount } from '@@generated/integrationAccount/entities/integrationAccount.entity';

import { AuthSpecificationOAuth } from 'services/integration_definition';

import {
  getProperties,
  getPropertyName,
  returnOAuthInputSpecification,
} from '../new_integration/new_integration_form_utils';

export function getInitialValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  integrationAccount: IntegrationAccount,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValues: Record<string, any> = {};

  Object.keys(spec.authSpecification).forEach((key) => {
    initialValues[getPropertyName(key)] = {};

    const specProperties = getProperties(
      key === 'OAuth2'
        ? returnOAuthInputSpecification(
            (
              spec.authSpecification[
                integrationAccount.authType
              ] as AuthSpecificationOAuth
            ).inputSpecification,
          )
        : spec.authSpecification[key].inputSpecification,
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

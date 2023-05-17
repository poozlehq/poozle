/** Copyright (c) 2023, Poozle, all rights reserved. **/

// TODO (harshith): Set current types for spec

export const OAuthInputSpec = {
  type: 'object',
  properties: {
    client_id: {
      type: 'string',
      title: 'Client Id',
      description: 'Enter the Client Id',
    },
    client_secret: {
      type: 'string',
      title: 'Client secret',
      description: 'Enter the Client secret',
    },
    refresh_token: {
      type: 'string',
      title: 'Refresh token',
      description: 'Enter the Refresh token',
    },
    scope: {
      type: 'string',
      title: 'Scope',
      description: 'Enter the Scope',
    },
  },
};

export function getPropertyName(propertyName: string): string {
  return propertyName.toLowerCase().replace(/ /g, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProperties(spec: any) {
  const specProperties = spec.properties;

  return Object.keys(specProperties).map((key) => ({
    key,
    ...specProperties[key],
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInitialValues(spec: any) {
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

  // Adding extensionAccountName to the initial Values
  initialValues['extensionAccountName'] = '';

  // eslint-disable-next-line prefer-destructuring
  initialValues['authType'] = spec.auth_supported[0];

  return initialValues;
}

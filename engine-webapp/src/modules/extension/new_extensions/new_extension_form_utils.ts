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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProperties(spec: any) {
  const specProperties = spec.properties;

  return Object.keys(specProperties).map((key) => ({
    key,
    ...specProperties[key],
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInitialValues(authType: string, spec: any) {
  const specProperties = getProperties(
    authType === 'OAuth2' ? OAuthInputSpec : spec.input_specification,
  );
  const initialValues: Record<string, string> = {};

  specProperties.forEach((property) => {
    initialValues[property.key] = '';
  });

  // Adding extensionAccountName to the initial Values
  initialValues['extensionAccountName'] = '';

  return initialValues;
}

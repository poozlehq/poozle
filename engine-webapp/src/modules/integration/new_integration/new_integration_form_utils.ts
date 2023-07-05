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

interface SpecificationInputSpecification {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
}

export function returnOAuthInputSpecification(
  specInputSpecification: SpecificationInputSpecification,
) {
  if (!specInputSpecification) {
    return OAuthInputSpec;
  }

  return {
    ...OAuthInputSpec,
    properties: {
      ...OAuthInputSpec.properties,
      ...specInputSpecification.properties,
    },
  };
}

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

export function getInitialValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  integrationAccountNameDefault?: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValues: Record<string, any> = {};

  Object.keys(spec.authSpecification).forEach((key) => {
    const specProperties = getProperties(
      key === 'OAuth2'
        ? returnOAuthInputSpecification(
            spec.authSpecification['OAuth2'].inputSpecification,
          )
        : spec.authSpecification[key].inputSpecification,
    );

    initialValues[getPropertyName(key)] = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specProperties.forEach((property: any) => {
      initialValues[getPropertyName(key)][property.key] = '';
    });
  });

  // Adding integrationAccountName to the initial Values
  initialValues['integrationAccountName'] = integrationAccountNameDefault ?? '';

  // eslint-disable-next-line prefer-destructuring
  initialValues['authType'] = spec.authSupported[0];

  return initialValues;
}

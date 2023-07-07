import { Specification } from '@poozle/engine-idk';
/** Copyright (c) 2023, Poozle, all rights reserved. **/

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

export function getAllInputProperties(spec: Specification, authType: string) {
  const otherProperties = spec.other_inputs
    ? getProperties(spec.other_inputs.input_specification)
    : [];

  return [
    ...getProperties(spec.auth_specification[authType].input_specification),
    ...otherProperties,
  ];
}

export function getInitialValues(
  spec: Specification,
  integrationAccountNameDefault?: string,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialValues: Record<string, any> = {};

  Object.keys(spec.auth_specification).forEach((key) => {
    const specProperties = getAllInputProperties(spec, key);

    initialValues[getPropertyName(key)] = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specProperties.forEach((property: any) => {
      initialValues[getPropertyName(key)][property.key] = '';
    });
  });

  // Adding integrationAccountName to the initial Values
  initialValues['integrationAccountName'] = integrationAccountNameDefault ?? '';

  // eslint-disable-next-line prefer-destructuring
  initialValues['authType'] = Object.keys(spec.auth_specification)[0];

  return initialValues;
}

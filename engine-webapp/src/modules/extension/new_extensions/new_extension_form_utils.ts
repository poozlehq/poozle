/** Copyright (c) 2023, Poozle, all rights reserved. **/

// TODO (harshith): Set current types for spec

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProperties(spec: any) {
  const specProperties = spec.integrationSpecification.properties.credentials;

  return Object.keys(specProperties).map((key) => ({
    key,
    ...specProperties[key],
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInitialValues(spec: any) {
  const specProperties = getProperties(spec);
  const initialValues: Record<string, string> = {};

  specProperties.forEach((property) => {
    initialValues[property.key] = '';
  });

  // Adding extensionAccountName to the initial Values
  initialValues['extensionAccountName'] = '';

  return initialValues;
}

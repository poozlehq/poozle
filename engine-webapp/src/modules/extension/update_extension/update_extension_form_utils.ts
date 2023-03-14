/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ExtensionAccount } from 'queries/generated/graphql';

// TODO (harshith): Set current types for spec

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProperties(spec: any) {
  const specProperties = spec.integrationSpecification.properties.credentials;

  return Object.keys(specProperties).map((key) => ({
    key,
    ...specProperties[key],
  }));
}

export function getInitialValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  extensionAccount: ExtensionAccount,
) {
  const specProperties = getProperties(spec);
  const initialValues: Record<string, string> = {};

  specProperties.forEach((property) => {
    const key: string = property.key;
    // TODO (harshith): Check for the right type here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValues[key] = (extensionAccount.extensionConfiguration as any)[key];
  });

  // Adding extensionAccountName to the initial Values
  initialValues['extensionAccountName'] = extensionAccount.extensionAccountName;

  return initialValues;
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ExtensionAccount } from 'queries/generated/graphql';

import { getProperties } from '../new_extensions/new_extension_form_utils';

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
    initialValues[key] = '';
  });

  // Adding extensionAccountName to the initial Values
  initialValues['extensionAccountName'] = extensionAccount.extensionAccountName;

  return initialValues;
}

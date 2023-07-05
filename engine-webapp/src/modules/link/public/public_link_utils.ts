/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function makeId(length: number) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getValidateObject(initialValues: any) {
  const validate: any = {};
  Object.keys(initialValues).forEach((key: any) => {
    validate[key] = (value: string) => (value ? null : `Invalid`);

    if (typeof initialValues[key] === 'object') {
      validate[key] = getValidateObject(initialValues[key]);
    }
  });

  return validate;
}

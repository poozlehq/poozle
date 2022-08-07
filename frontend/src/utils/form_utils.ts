/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import validate from './validate';

/**
 * Takes validate schema ( array of  Objects with test function and error message)
 * and Interate over the schema and returns the first match
 */
export function validateSchema(schema: Array<{ test: Function; message: string }>): Function {
  return function (value: string): string | null {
    // eslint-disable-next-line jest/no-disabled-tests
    const match = schema.find(({ test }) => !test(value));
    return match ? match.message : null;
  };
}

type ValidateSchema = {
  test: Function;
  message: string;
};

export function getValidateProps(toValidateProps: Array<string>, name: string): Function {
  const properties: ValidateSchema[] = [];

  toValidateProps.forEach((property: string) => {
    if (typeof validate[property] === 'function') {
      properties.push({
        test: validate[property],
        message: `${name} is not valid`,
      });
    }
  });

  return validateSchema(properties);
}

type Response = {
  isError: boolean;
  error?: string;
  data?: any;
};

export function responseParser(data: any): Response {
  if ('error' in data) {
    return { isError: true, error: data.error.data.message };
  } else {
    return { isError: false, data };
  }
}

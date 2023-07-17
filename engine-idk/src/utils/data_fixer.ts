/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

export const convertToRequestBody = (body: any, mappings: any) => {
  const convertedBody: any = {};

  for (const originalKey in mappings) {
    const transformedKey = mappings[originalKey];
    const value = body[originalKey];

    if (value !== undefined) {
      convertedBody[transformedKey] = value;
    }
  }

  return convertedBody;
};

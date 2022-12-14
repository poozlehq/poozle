/** Copyright (c) 2022, Poozle, all rights reserved. **/

export function getAssetURL(path: string): string {
  return `https://poozle-assets.s3.ap-south-1.amazonaws.com/${path}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmpty(value: any): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

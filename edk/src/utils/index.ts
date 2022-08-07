export const log = console.log; // eslint-disable-line no-console
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logRecord = (s: any) =>
  typeof s === 'object' ? log(JSON.stringify(s)) : log(s);

export * from './record';

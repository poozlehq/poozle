/* eslint-disable @typescript-eslint/no-explicit-any */
export enum CommandType {
  Spec = 'spec',
  Commands = 'commands',
  About = 'about',
  Do = 'do',
  Callback = 'callback',
  FetchData = 'fetchData',
}

export type DoParams = {
  [x: string]: any;
};

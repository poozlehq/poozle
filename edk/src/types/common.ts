export declare enum CommandType {
  Spec = 'spec',
  Commands = 'commands',
  About = 'about',
  Do = 'do',
  Callback = 'callback',
  FetchData = 'fetchData',
}

export type DoParams = Record<string, any>;

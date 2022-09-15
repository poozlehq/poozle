import { Surface } from '../../types/common';
import { Command } from '../../utils/commands';

export enum CommandViewType {
  Form = 'Form',
  Search = 'Search',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandRecordType = Record<string, any>;

export interface CommandTreeRecord {
  command: Command;
  record: Surface;
}

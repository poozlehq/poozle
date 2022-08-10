import { Command } from '../../utils/commands';

export enum ViewType {
  Form = 'Form',
  Search = 'Search',
}

export type CommandRecordType = { [x: string]: any };

export type CommandTreeRecord = {
  command: Command;
  record: CommandRecordType;
};

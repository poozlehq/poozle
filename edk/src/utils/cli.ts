import { Authentication, CommandType, DoParams } from '../types';

export function getCommand(argv: Array<string>): CommandType {
  return argv[2] as CommandType;
}

export function getAuthentication(argv: Array<string>): Authentication {
  try {
    const authOptionKey = argv.findIndex((arg) => arg === '-a');
    if (authOptionKey) {
      const authJSON = JSON.parse(argv[authOptionKey + 1]);

      return authJSON as Authentication;
    }

    return {};
  } catch (e) {
    return {};
  }
}

export function getParams(argv: Array<string>): DoParams | undefined {
  try {
    const paramsOptionKey = argv.findIndex((arg) => arg === '-p');
    if (paramsOptionKey) {
      const paramsJSON = JSON.parse(argv[paramsOptionKey + 1]);

      return paramsJSON as DoParams;
    }

    return {};
  } catch (e) {
    return {};
  }
}

export function getOptionValues(
  argv: Array<string>,
  forCommand = 'do',
): string {
  const doKey = argv.findIndex((arg) => arg === forCommand);
  return argv[doKey + 1];
}

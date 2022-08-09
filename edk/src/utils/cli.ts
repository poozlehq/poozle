import { Spec, CommandType, DoParams } from '../types';

export function getCommand(argv: Array<string>): CommandType {
  return argv[2] as CommandType;
}

export function getSpec(argv: Array<string>): Spec {
  try {
    const specOptionKey = argv.findIndex((arg) => arg === '-s');
    if (specOptionKey) {
      const specJSON = JSON.parse(argv[specOptionKey + 1]);

      return specJSON as Spec;
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

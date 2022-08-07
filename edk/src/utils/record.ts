import { About, CommandType, Commands } from '../types';

export const Record = (
  type: CommandType,
  record: About | Commands | string | undefined,
) => {
  return { type, record };
};

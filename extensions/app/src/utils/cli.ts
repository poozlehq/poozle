import axios from 'axios';
import 'child_process';
import * as util from 'util';

export async function cliGet<T>(path: string): Promise<T> {
  const exec = util.promisify(require('child_process').exec);
  const {stdout} = await exec(path)
  return stdout;
}

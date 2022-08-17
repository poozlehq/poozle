import axios from 'axios';
import 'child_process';
import { Repo, Issue } from '../types';
import * as util from 'util';

export async function cliGet<T>(path: string): Promise<T> {
  const exec = util.promisify(require('child_process').exec);
  // `mdfind \'kMDItemContentTypeTree == \"com.apple.application\"c\' | sort`
  const {stdout} = await exec("mdfind 'kMDItemContentTypeTree == \"com.apple.application\"c' | sort");
  // const ls = new Command('search', ["mdfind", "kMDItemContentTypeTree == \"com.apple.application\"c", "|", "sort"])

  
  console.log(stdout)

  return undefined;
}

export async function apiPost(
  path: string,
  bearerToken: string,
  values: any,
): Promise<Repo[]> {
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `token ${bearerToken}`,
  };

  const response = await axios.post(path, values, {
    headers,
  });

  return response.data;
}

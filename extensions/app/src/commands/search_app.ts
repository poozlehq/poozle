import { AbstractCommand, Spec, DoParams, Builder } from '@poozle/edk';
import { SearchResult } from '@poozle/edk/lib/cjs/builder';
import { ChildProcess } from 'child_process';

import { SearchAppAction } from '../actions';

import { Repo,  Issue } from '../types';

import { cliGet } from '../utils/cli';

const { Option } = Builder;
export class SearchAppCommand extends AbstractCommand {
  key = 'search-app';
  name = 'Search Local App';
  description = 'Search Local App';
  icon = 'github.svg';

  fetchDataKeys: Array<string> = ['search_app'];

  path = '/repos/{owner}/{repo}/issues';

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new SearchAppAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: any): Promise<any> {
    if (key === 'search_app') {
      const repos: any = await cliGet('any');
      
      // repos.stdout.on("data", data => {
      //   console.log(`stdout: ${data}`);
      // });

      return undefined;
    }
  }
}

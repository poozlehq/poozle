import {
  AbstractCommand,
  Authentication,
  DoParams,
  Builder,
} from '@poozle/edk';

import { NewIssueAction } from '../actions';

import { Repo } from '../types';

import { api } from '../utils/api';

const { Option } = Builder;
export class NewIssueCommand extends AbstractCommand {
  key = 'new-issue';
  name = 'Create issue';
  description = 'Create issue';
  icon = 'github.svg';

  fetchDataKeys: Array<string> = ['repository_name'];

  path = '/repos/{owner}/{repo}/issues';

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new NewIssueAction()];
  }

  async fetchDataController(
    key: string,
    params: DoParams,
    authentication: Authentication,
  ) {
    if (key === 'repository_name') {
      const repos: Repo[] = await api(
        `https://api.github.com/user/repos`,
        authentication.bearer_token,
      );

      return repos.map((repo: Repo) => {
        return Option({
          text: repo.full_name,
          icon: repo.owner.avatar_url,
          value: repo.full_name,
        }).build();
      });
    }
  }
}

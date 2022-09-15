import { AbstractCommand, Spec, DoParams, Builder } from '@poozle/edk';
import { SearchResult } from '@poozle/edk/lib/cjs/builder';

import { SearchIssueAction } from '../actions';

import { Repo, Issue } from '../types';

import { apiGet } from '../utils/api';

const { Option } = Builder;
export class SearchIssueCommand extends AbstractCommand {
  key = 'search-issue';
  name = 'Search issue';
  description = 'Search issue';
  icon = 'github.svg';

  fetchDataKeys: Array<string> = ['repository_name', 'search_issue'];

  path = '/repos/{owner}/{repo}/issues';

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new SearchIssueAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: Spec) {
    if (key === 'repository_name') {
      const repos: Repo[] = await apiGet<Repo[]>(
        `https://api.github.com/user/repos`,
        spec.api_key,
      );

      return repos.map((repo: Repo) => {
        return Option({
          text: repo.full_name,
          icon: repo.owner.avatar_url,
          value: repo.full_name,
        }).build();
      });
    } else if (key === 'search_issue') {
      const path = `https://api.github.com/search/issues?q=${encodeURIComponent(
        `is:issue ${params.issue_name} repo:${params.repository_name}`,
      )}`;

      const issues: { items: Issue[] } = await apiGet<{ items: Issue[] }>(
        path,
        spec.api_key,
      );

      return issues.items.map((issue: Issue) => {
        return SearchResult({
          text: issue.title,
          icon: issue.user.avatar_url,
          description: issue.body,
        }).build();
      });
    }
  }
}

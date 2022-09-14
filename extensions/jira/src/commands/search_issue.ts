import { AbstractCommand, Spec, DoParams, Builder } from '@poozle/edk';
import { SearchResult } from '@poozle/edk/lib/cjs/builder';

import { SearchIssueAction } from '../actions';

import { Project, Projects,  Issue, Issues } from '../types';

import { apiGet, apiPost } from '../utils/api';

const { Option } = Builder;
export class SearchIssueCommand extends AbstractCommand {
  key = 'search-issue';
  name = 'Search issue';
  description = 'Search issue';
  icon = 'jira.svg';

  fetchDataKeys: Array<string> = ['projects', 'search_issue'];

  path = '/repos/{owner}/{repo}/issues';
  basePath = 'https://gelocity.atlassian.net'

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new SearchIssueAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: any) {
    if (key === 'project_name') {
      const path = `https://${spec.jira_domain}.atlassian.net/rest/api/3/project/search`;

      const projects: Projects = await apiGet<Projects>(
        path,
        spec.email_id,
        spec.api_key
      );

      return projects.values.map((project: Project) => {
        return Option({
          text: project.name,
          icon: project.avatarUrls['48x48'],
          value: project.key,
        }).build();
      });
    }

    else if (key === "search_issue") {
      const path = `https://${spec.jira_domain}.atlassian.net/rest/api/3/search`

      const values = {
        expand: ["names"],
        jql: `project = ${params.project_key} and summary~'${params.issue_name}'`,
        maxResults: 15,
        fieldsByKeys: false,
        fields: ["summary","status","assignee","description"],
        startAt: 0
      }

      const issues: Issues = await apiPost(path, spec.email_id, spec.api_key, values);

      return issues.issues.map((issue: Issue) => {
        return SearchResult({
          text: issue.fields.summary,
          icon: issue.fields.assignee.avatarUrls['48x48'],
          description: issue.fields.description,
          url: issue.self
        }).build();
      });

    }
  }
}

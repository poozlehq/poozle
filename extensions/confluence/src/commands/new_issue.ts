import { AbstractCommand, DoParams, Builder } from '@poozle/edk';

import { NewIssueAction } from '../actions';

import { Assignee, Issue, Issues, IssueType, Space, Spaces } from '../types';

import { apiGet, apiPost } from '../utils/api';

const { Option } = Builder;
export class NewIssueCommand extends AbstractCommand {
  key = 'new-issue';
  name = 'Create issue';
  description = 'Create issue';
  icon = 'jira.svg';

  fetchDataKeys: Array<string> = ['project_name', 'issue_type', 'parent_issue', 'assignee'];

  path = '/repos/{owner}/{repo}/issues';

  // TODO: hard type it later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActions(): any[] {
    return [new NewIssueAction()];
  }

  async fetchDataController(key: string, params: DoParams, spec: any) {
    if (key === 'project_name') {
      const path = `https://${spec.confluence_domain}.atlassian.net/wiki/rest/api/space`;

      const apiParams = { type: 'global', limit: 100 };

      const spaces: Spaces = await apiGet<Spaces>(
        path,
        spec.email_id,
        spec.api_key,
        apiParams,
      );

      return spaces.results.map((space: Space) => {
        return Option({
          text: space.name,
          icon: space._expandable.icon,
          value: space.key,
        }).build();
      });
    }

    else if (key === 'issue_type') {
      const path = `https://${spec.jira_domain}.atlassian.net/rest/api/3/issuetype/project`;

      const apiParams = {'projectId':params.project_key};
      const issuetypes: IssueType[] = await apiGet<IssueType[]>(
        path,
        spec.email_id,
        spec.api_key,
        apiParams
      );

      return issuetypes.map((issueType: IssueType) => {
        return Option({
          text: issueType.name,
          icon: issueType.iconUrl,
          value: issueType.id,
        }).build();
      });
    }

    else if (key === 'parent_issue'){
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
        return Option({
          text: issue.fields.summary,
          icon: issue.fields.assignee.avatarUrls['48x48'],
          value: issue.id,
        }).build();
      });
    }

    else if (key === 'assignee'){
      const path = `https://${spec.jira_domain}.atlassian.net/rest/api/3/user/assignable/search`;

      const apiParams = {'project':params.project_key};
      const assignees: Assignee[] = await apiGet<Assignee[]>(
        path,
        spec.email_id,
        spec.api_key,
        apiParams
      );

      return assignees.map((assignee: Assignee) => {
        return Option({
          text: assignee.displayName,
          icon: assignee.avatarUrls['48x48'],
          value: assignee.accountId,
        }).build();
      });
    }
  }
}

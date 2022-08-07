import {
  AbstractCommand,
  Authentication,
  DoParams,
  Builder,
} from '@poozle/edk';
import { Repo } from '../types';

import { api } from '../utils/api';

const { Input, Form, TextInput, Section, Select, Option } = Builder;

export class NewIssue extends AbstractCommand {
  key = 'new-issue';
  name = 'Create issue';
  description = 'Create issue';
  icon = 'github.svg';

  callbackKeys: Array<string> = [this.key];
  fetchDataKeys: Array<string> = ['repository_name'];

  path = '/repos/{owner}/{repo}/issues';

  doController(params: DoParams, authentication: Authentication) {
    return Form()
      .blocks(
        Input({
          label: 'Repository Name',
        }).element(
          Select().fetchDataId('repository_name').actionId('repository_name'),
        ),
        Section()
          .blocks(
            Input({
              label: 'Issue Title',
            }).element(
              TextInput({ placeholder: 'Enter the issue title' }).actionId(
                'issue_title',
              ),
            ),
            Input({
              label: 'Issue Description',
            }).element(
              TextInput({
                placeholder: 'Enter the issue description',
              }).actionId('issue_description'),
            ),
          )
          .conditionalCheck('repository_name'),
      )
      .callbackId(this.key);
  }

  async callbackController(
    callback_id: string,
    params: DoParams,
    authentication: Authentication,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    console.log('here');
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

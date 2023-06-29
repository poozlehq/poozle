import { BasePath, Config, Params, User, PathResponse } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';
import { convertUser } from './user.utils';

export class UsersPath extends BasePath<User> {
  async fetchUsers(url: string, headers: AxiosHeaders, _params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return response.data.map((data: any) =>
      convertUser(data),
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  async run(
    method: string,
    headers: AxiosHeaders,
    params: Params,
    config: Config,
  ): Promise<PathResponse<User>> {
    const BASE_URL = `https://${config.jira_domain}.atlassian.net`;
    let url = '';

    switch (method) {
      case 'GET':
        url = `${BASE_URL}/rest/api/2/users/search`;
        return this.fetchUsers(url, headers, params);

      default:
        return {};
    }
  }
}

import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetUsersPath extends BasePath {
  async getUserById(headers: AxiosHeaders, userId: string, params: Params) {
    const response = await axios({
      url: `${BASE_URL}/users/${userId}`,
      headers,
    });

    return {
      data: convertToModelKeys(
        {
          id: response.data.id,
          name: response.data.name,
          email_address: response.data.email,
          avatar: response.data.avatar_url,
        },
        this.schema,
        response.data,
        params.queryParams?.raw ? true : false,
      ),
      meta: {},
    };
  }

  async getUsers(headers: AxiosHeaders, params: Params, config: Config) {
    const response = await axios({
      url: `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues?state=all`,
      headers,
    });

    const users = new Set<string>();

    response.data.forEach((issue: any) => {
      if (issue.user && issue.user.login) {
        users.add(issue.user.login);
      }
      if (issue.assignee && issue.assignee.login) {
        users.add(issue.assignee.login);
      }
    });

    const usersData = await Promise.all(
      Array.from(users).map((userId: string) => this.getUserById(headers, userId, params)),
    );

    return {
      data: usersData.map((userData: any) => userData.data),
      meta: {},
    };
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    if (params.pathParams?.user_id) {
      return this.getUserById(headers, params.pathParams?.user_id as string, params);
    } else {
      return this.getUsers(headers, params, config);
    }
  }
}

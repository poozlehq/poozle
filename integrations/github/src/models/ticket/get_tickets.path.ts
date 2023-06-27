/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config, Params, convertToModelKeys } from '@poozle/engine-edk';
import axios, { AxiosHeaders } from 'axios';

const BASE_URL = 'https://api.github.com';

export class GetTicketsPath extends BasePath {
  convertTicket(data: any, raw: boolean, collection_id: string | null) {
    return convertToModelKeys(
      {
        id: data.id,
        subject: data.title,
        collection_id,
        description: data.body,
        status: data.state,
        created_at: data.created_at,
        updated_at: data.updated_at,
        created_by: data.user.login,
        type: data.pull_request ? 'pull_request' : 'issue',
        assignees: data.assignees.map((ass: any) => ({
          id: ass.id,
          username: ass.login,
        })),
        ticket_url: data.url,
        tags: data.labels.map((lab: any) => ({
          id: lab.id,
          name: lab.name,
        })),
      },
      this.schema,
      data,
      raw,
    );
  }

  async fetchSingleTicket(url: string, headers: AxiosHeaders, params: Params) {
    try {
      const response = await axios({
        url,
        headers,
      });

      return {
        data: this.convertTicket(
          response.data,
          params.queryParams?.raw ? true : false,
          params.pathParams?.collection_id as string | null,
        ),
      };
    } catch (e) {
      return {
        data: {},
        error: e.message,
      };
    }
  }

  async fetchData(url: string, headers: AxiosHeaders, params: Params) {
    const page =
      typeof params.queryParams?.cursor === 'string' ? parseInt(params.queryParams?.cursor) : 1;

    const response = await axios({
      url,
      headers,
      params: {
        per_page: params.queryParams?.limit,
        page,
      },
    });

    const responseData = response.data;

    return {
      data: responseData.map((data: any) =>
        this.convertTicket(
          data,
          params.queryParams?.raw ? true : false,
          params.pathParams?.collection_id as string | null,
        ),
      ),
      meta: {
        items_on_page: params.queryParams?.limit,
        cursors: {
          before: page > 1 ? page - 1 : 1,
          current: page,
          next: page + 1,
        },
      },
    };
  }

  async run(_method: string, headers: AxiosHeaders, params: Params, config: Config): Promise<any> {
    if (params.pathParams?.ticket_id) {
      const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues/${params.pathParams?.ticket_id}`;
      return this.fetchSingleTicket(url, headers, params);
    }
    const url = `${BASE_URL}/repos/${config.org}/${params.pathParams?.collection_id}/issues`;
    return this.fetchData(url, headers, params);
  }
}

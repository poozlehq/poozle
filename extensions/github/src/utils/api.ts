import axios from 'axios';
import { Repo, Issue } from '../types';

export async function apiGet<T>(path: string, bearerToken: string): Promise<T> {
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `token ${bearerToken}`,
  };

  const response = await axios.get(path, {
    headers,
    params: { per_page: 100 },
  });

  return response.data;
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

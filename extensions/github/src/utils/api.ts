import axios from 'axios';
import { Repo } from '../types';

export async function api(path: string, bearerToken: string): Promise<Repo[]> {
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `token ${bearerToken}`,
  };

  const response = await axios.get(path, { headers });

  return response.data;
}

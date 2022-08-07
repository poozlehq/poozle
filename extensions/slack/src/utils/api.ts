/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export async function get(path: string, bearerToken: string): Promise<any[]> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const response = await axios.get(path, { headers });

  return response.data;
}

export async function post(
  path: string,
  bearerToken: string,
  data: any,
): Promise<void> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };

  const response = await axios.post(path, data, { headers });

  return response.data;
}

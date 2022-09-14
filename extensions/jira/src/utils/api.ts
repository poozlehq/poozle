import axios from 'axios';

export async function apiGet<T>(
  path: string,
  emailID: string,
  apiKey: string,
  params?: any,
): Promise<T> {
  const headers = {
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(`${emailID}:${apiKey}`).toString(
      'base64',
    )}`,
  };


  const response = await axios.get(path, {
    headers,
    params: params,
  });

  return response.data;
}

export async function apiPost<T>(
  path: string,
  emailID: string,
  apiKey: string,
  values: any,
): Promise<T> {
  const headers = {
    Accept: 'application/json',
    Authorization: `Basic ${Buffer.from(`${emailID}:${apiKey}`).toString(
      'base64',
    )}`,
  };

  const response = await axios.post(path, values, {
    headers,
  });

  return response.data;
}

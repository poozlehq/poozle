/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { createClient } from 'redis';

import { convertToString, getConfigJSON } from './commonUtils';
import {
  getAccessToken,
  interpolateHeaders,
  interpolateString,
} from './oAuthUtils';

interface Spec {
  token_url: string;
  headers: Record<string, string>;
  query_params?: Record<string, string>;
}

interface RedisValue {
  headers: Record<string, string>;
  queryParams: Record<string, string>;
}

function getRedisClient() {
  try {
    const client = createClient({
      url: process.env.REDIS_URL,
    });

    return client;
  } catch (e) {
    console.log(e);

    return undefined;
  }
}

/**
 * To save the built credentails to redis cache
 */
async function saveToRedis(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: any,
  key: string,
  value: string,
  expiresIn: number,
) {
  if (client) {
    try {
      const setValue = await client.set(
        `${process.env.WORKSPACE_ID}__${key}`,
        value,
        {
          EX: expiresIn,
        },
      );
      return setValue;
    } catch (e) {
      console.log(e);

      return undefined;
    }
  }

  return undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getFromRedis(client: any, key: string) {
  try {
    const value = await client.get(key);
    return value;
  } catch (e) {
    console.log(e);

    return undefined;
  }
}

async function getHeaders(
  authType: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any,
  spec: Spec,
) {
  let token = '';
  let headers = spec.headers;

  if (authType === 'OAuth2') {
    token = await getAccessToken(
      interpolateString(spec.token_url, config),
      config,
    );
    headers = {
      Authorization: 'Bearer ${token}',
    };
  }

  return interpolateHeaders(headers ? headers : {}, {
    token,
    ...config,
  });
}

async function getQueryParams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any,
  spec: Spec,
) {
  const queryParams = spec.query_params;

  return interpolateHeaders(queryParams ? queryParams : {}, config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAuthHeadersAndQueryParams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
): Promise<RedisValue> {
  let redisIsAvailable = false;

  try {
    const headers = options.headers;

    /**
     * These values will only passed once mesh is build and we running queries through mesh
     */
    if (headers.config && headers.name) {
      const client = getRedisClient();
      const config = getConfigJSON(headers.config);

      if (client) {
        redisIsAvailable = true;
        await client.connect();
      }

      /**
       * Run redis only if the client is available
       */
      if (redisIsAvailable) {
        const redisValue = await getFromRedis(client, headers.name);
        /**
         * If the redis has the key return the key without fetching it again
         */
        if (redisValue) {
          return getConfigJSON(redisValue) as RedisValue;
        }
      }

      const finalHeaders = await getHeaders(
        headers.authtype,
        config,
        getConfigJSON(headers.spec) as Spec,
      );

      const queryParams = await getQueryParams(
        config,
        getConfigJSON(headers.spec) as Spec,
      );

      /**
       * Run redis only if the client is available
       */
      if (redisIsAvailable) {
        await saveToRedis(
          client,
          headers.name,
          convertToString({ headers: finalHeaders, queryParams }),
          headers.redisExpiry || 60,
        );
        await client.disconnect();
      }

      return {
        headers: finalHeaders,
        queryParams,
      };
    }
    return {
      headers: {},
      queryParams: {},
    };
  } catch (e) {
    console.log(e);
    return {
      headers: {},
      queryParams: {},
    };
  }
}

import axios, { AxiosRequestConfig, Method } from 'axios';
import { GITHUB_API_URL } from './constants';

class BaseFunction {
  name: string;
  key: string;

  constructor(name: string, key: string) {
    this.name = name;
    this.key = key;
  }
}

class BaseAPIFunction extends BaseFunction {
  url: string;
  method: Method;

  constructor(url: string, method: Method, name: string, key: string) {
    super(name, key);
    this.url = url;
    this.method = method;
  }

  async run(queryOptions: AxiosRequestConfig) {
    console.log(queryOptions);
    return await axios({
      method: this.method,
      url: this.url,
      ...queryOptions,
    });
  }
}

class BaseExtension {
  name: string;
}

class GithubExtension extends BaseExtension {
  name = 'Github';

  getFunctions(): BaseAPIFunction[] {
    return [
      new BaseAPIFunction(
        `${GITHUB_API_URL}/search/issues`,
        'GET' as Method,
        'Get issues',
        'get_issues',
      ),
    ];
  }

  async run(function_key: string, functionProperties: any) {
    const functionToRun = this.getFunctions().find(
      (func: BaseFunction) => func.key === function_key,
    );

    if (!functionToRun) {
      return Promise.resolve('Function not found');
    }

    return await functionToRun.run(functionProperties);
  }
}

async function handler(context: any) {
  const { body } = context.request;
  try {
    const extensionObj = new GithubExtension();

    const response = await extensionObj.run(
      body.function_key,
      body.function_properties,
    );

    return {
      status: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    console.log(e);
    return {
      status: 400,
      body: JSON.stringify(e),
    };
  }
}

export default handler;

function run() {
  handler({
    request: {
      body: {
        function_key: 'get_issues',
        function_properties: {
          params: {
            q: 'is:issue repo:poozlehq/poozle',
            per_page: 10,
          },
          headers: {
            Authorization:
              'token',
          },
        },
      },
    },
  })
    .then((something) => {
      console.log(something);
    })
    .catch((error) => {
      console.log(error);
    });
}

run();

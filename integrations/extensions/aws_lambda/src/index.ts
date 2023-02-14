/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";
import { resolve } from "path";

import {
  AuthHeaderResponse,
  BaseRestExtension,
  Config,
  Context,
  BaseURLResponse,
} from "@poozle/engine-edk";
import { SpecResponse } from "@poozle/engine-edk";
import * as aws4 from "aws4";

class AWSLambdaExtension extends BaseRestExtension {
  authHeaders(config: Config): AuthHeaderResponse {
    const response = aws4.sign(
      {
        service: "lambda",
        region: config.region,
        method: config.context.method.toUpperCase(),
        path: config.context.path,
      },
      {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.headers as any;
  }

  async getSchema(): Promise<string> {
    const schemaJSON = JSON.parse(
      fs.readFileSync(resolve("schema/aws_lambda.json"), "utf8")
    );

    return schemaJSON;
  }

  getSpec(): SpecResponse {
    const data = fs.readFileSync("./spec.json", "utf8");

    return JSON.parse(data) as SpecResponse;
  }

  async baseURL(context: Context): BaseURLResponse {
    return `https://lambda.${context.config.region}.amazonaws.com`;
  }
}

export default AWSLambdaExtension;

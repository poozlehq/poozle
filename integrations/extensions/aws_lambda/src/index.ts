/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";
// import * as https from "https";

import * as aws4 from "aws4";

type Config = any;

const enum SchemaType {
  "GRAPHQL" = "GRAPHQL",
  "OPENAPI" = "OPENAPI",
}

interface Schema {
  type: SchemaType;
  schema?: string;
  openapiSchema?: string;
}

const enum InputType {
  input = "input",
}

interface Input {
  name: string;
  key: string;
  description: string;
  type: InputType;
}

interface Spec {
  name: string;
  key: string;
  description?: string;
  icon: string;
  type: SchemaType;
  inputBlocks: Input[];
}

class GithubExtension {
  getAuthHeaders(config: Config): Record<string, string> {
    const response = aws4.sign(
      {
        service: "lambda",
        region: config.region as string,
        method: config.context.method,
        path: "/2015-03-31/functions/",
      },
      {
        accessKeyId: config.accessKeyId as string,
        secretAccessKey: config.secretAccessKey as string,
      }
    );
    return {
      Authorization: response.headers.Authorization as string,
      "X-Amz-Date": response.headers["X-Amz-Date"] as string,
      Host: response.headers.Host as string,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSchema(_config: Config): Promise<Schema> {
    const schema = JSON.parse(fs.readFileSync("./aws_lambda.json", "utf8"));

    return {
      type: SchemaType.OPENAPI,
      schema,
    };
  }

  getSpec(): Spec {
    const data = fs.readFileSync("./spec.json", "utf8");

    return JSON.parse(data) as Spec;
  }
}

export default GithubExtension;

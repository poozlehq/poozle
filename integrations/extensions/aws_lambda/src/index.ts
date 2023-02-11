/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";

import * as aws4 from "aws4";

interface Config {
  region: string;
  context: {
    method: string;
    path: string;
  };
  accessKeyId: string;
  secretAccessKey: string;
}

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
    return response.headers as Record<string, string>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSchema(config: Config): Promise<Schema> {
    const schema = JSON.parse(fs.readFileSync("./aws_lambda.json", "utf8"));

    const changedSchema = {
      ...schema,
      servers: [
        {
          url: schema.servers[0].url.replace("{region}", config.region),
        },
      ],
    };

    return {
      type: SchemaType.OPENAPI,
      schema: changedSchema,
    };
  }

  getSpec(): Spec {
    const data = fs.readFileSync("./spec.json", "utf8");

    return JSON.parse(data) as Spec;
  }
}

export default GithubExtension;

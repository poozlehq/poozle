/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";
// import fetch from "node-fetch";

import * as aws4 from "aws4";
import { GraphQLSchema } from "graphql";
import { createGraphQLSchema } from "openapi-to-graphql-harshith";

interface Config {
  region: string;
  context: {
    method: string;
    path: string;
  };
  accessKeyId: string;
  secretAccessKey: string;
}

interface Context {
  config: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  };
}

const enum SchemaType {
  "GRAPHQL" = "GRAPHQL",
  "OPENAPI" = "OPENAPI",
}

interface Schema {
  type: SchemaType;
  schema: GraphQLSchema;
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

class AWSLambdaExtension {
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
  async getSchema(): Promise<Schema> {
    const schemaJSON = JSON.parse(fs.readFileSync("./aws_lambda.json", "utf8"));

    const { schema } = await createGraphQLSchema(schemaJSON, {
      baseUrl: (_context: any) => {
        return "https://lambda.ap-south-1.amazonaws.com";
      },
      headers: (
        method: string,
        path: string,
        _title,
        context: { context: Context }
      ) => {
        if (context) {
          const credentials = context?.context.config;

          return this.getAuthHeaders({
            ...credentials,
            context: { method, path },
          });
        }

        return {};
      },
    });

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

export default AWSLambdaExtension;

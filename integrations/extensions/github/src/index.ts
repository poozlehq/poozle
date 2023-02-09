/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";

import { schemaFromExecutor } from "@graphql-tools/wrap";
import axios from "axios";
import * as graphql from "graphql";
import { printSchema } from "graphql";

import { GITHUB_API_URL } from "./constants";

type Config = Record<string, string | number>;

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
  url = GITHUB_API_URL;

  getAuthHeaders(config: Config): Record<string, string | number> {
    const token = config["api_key"] as string;
    return {
      Authorization: `token ${token}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  async getSchema(config: Config): Promise<Schema> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const remoteExecutor = async ({ document, variables }: any) => {
      const query = graphql.print(document);
      try {
        const fetchResult = await axios.post(
          this.url,
          {
            query,
            variables,
          },
          {
            headers: {
              "Content-Type": "application/json",
              ...this.getAuthHeaders(config),
            },
          }
        );

        return fetchResult.data;
      } catch (e) {
        console.log(e);
        return {};
      }
    };

    const schema = await schemaFromExecutor(remoteExecutor);

    return {
      type: SchemaType.GRAPHQL,
      schema: printSchema(schema),
    };
  }

  getSpec(): Spec {
    const data = fs.readFileSync("./spec.json", "utf8");

    return JSON.parse(data) as Spec;
  }
}

export default GithubExtension;

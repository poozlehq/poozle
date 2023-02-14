/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";

import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import axios from "axios";
import * as graphql from "graphql";
// import { GraphQLSchema } from "graphql";

import { GITHUB_API_URL } from "./constants";

type Config = Record<string, string | number>;

const enum SchemaType {
  "GRAPHQL" = "GRAPHQL",
  "OPENAPI" = "OPENAPI",
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
  async getSchema(): Promise<any> {
    const remoteExecutor = async ({ document, variables, context }: any) => {
      const credentials = context.config;
      const query = graphql.print(document);
      const fetchResult = await axios.post(
        this.url,
        {
          query,
          variables,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...this.getAuthHeaders(credentials),
          },
        }
      );
      return fetchResult.data;
    };
    const schema = await loadSchema("schema/github.graphql", {
      loaders: [new GraphQLFileLoader()],
    });

    return {
      schema,
      executor: remoteExecutor,
    };
  }

  getSpec(): Spec {
    const data = fs.readFileSync("./spec.json", "utf8");

    return JSON.parse(data) as Spec;
  }
}

export default GithubExtension;

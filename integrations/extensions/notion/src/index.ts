/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";

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
  getAuthHeaders(config: Config): Record<string, string | number> {
    const token = config["api_key"] as string;
    return {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28"
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSchema(_config: Config): Promise<Schema> {
    const schema = JSON.parse(fs.readFileSync("./notion.json", "utf8"));

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

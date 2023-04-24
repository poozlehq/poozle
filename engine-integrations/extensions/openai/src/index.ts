/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";
import { resolve } from "path";

import {
  AuthHeaderResponse,
  BaseRestExtensionNew,
  Config,
  CheckResponse
} from "@poozle/engine-edk";
import { SpecResponse } from "@poozle/engine-edk";
import { fetchEngines } from "./utils";

class OpenaiExtension extends BaseRestExtensionNew {
  name = 'openai';

  async authHeaders(config: Config): AuthHeaderResponse {
    // Need to return the headers the API expects
    return {
      Authorization: `Bearer ${config.api_token}`,
    };
  }

  async getSchema(): Promise<string> {
    const schemaJSON = JSON.parse(
      fs.readFileSync(resolve("schema/schema.json"), "utf8")
    );

    return schemaJSON;
  }

  getSpec(): SpecResponse {
    const data = fs.readFileSync("./spec.json", "utf8");

    return JSON.parse(data) as SpecResponse;
  }

  async checkCredentials(config: Config): CheckResponse {
    
    const headers = await this.authHeaders(config)
    console.log(headers)
    await fetchEngines(
      headers
    );

    return { status: true, error: '' };
  }
}

export default OpenaiExtension;

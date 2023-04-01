/** Copyright (c) 2023, Poozle, all rights reserved. **/
import * as fs from "fs";
import { resolve } from "path";

import {
  AuthHeaderResponse,
  BaseRestExtensionNew,
  Config,
  CheckResponse,
} from "@poozle/engine-edk";
import { SpecResponse } from "@poozle/engine-edk";
import { fetchAccessToken } from "./utils";

class GoogleAdminExtension extends BaseRestExtensionNew {
  name = 'google admin';
  async authHeaders(config: Config): AuthHeaderResponse {
    try {
      const { access_token } = await fetchAccessToken(
        config.client_id,
        config.client_secret,
        config.refresh_token,
      );
      return {
        Authorization: `Bearer ${access_token}`,
      };
    } catch (e) {
      return {};
    }
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
    await fetchAccessToken(
      config.client_id,
      config.client_secret,
      config.refresh_token,
    );

    return { status: true, error: '' };
  }
}

export default GoogleAdminExtension;

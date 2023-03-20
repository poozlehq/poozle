/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { getGraphqlSchemaFromJsonSchema } from "get-graphql-from-jsonschema";

export function getJSONFrombase64(config64: string) {
  try {
    if (config64) {
      const buff = new Buffer(config64, "base64");
      let config = buff.toString("utf8");
      config = JSON.parse(config);

      // This to check if the base64 is still not parsed to JSON
      if (typeof config === "string") {
        config = JSON.parse(config);
      }

      return config;
    }

    return {};
  } catch (e) {
    return {};
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTypedefsForCredentialsAndSpec(spec: any) {
  const { typeDefinitions } = getGraphqlSchemaFromJsonSchema({
    rootName: "spec",
    /**
     * TODO(harshith): Check for any
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: spec.integrationSpecification as any,
    direction: "output",
  });

  const { typeDefinitions: typesInput } = getGraphqlSchemaFromJsonSchema({
    rootName: "credentials",
    /**
     * TODO(harshith): Check for any
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: spec.integrationSpecification.properties.credentials as any,
    direction: "input",
  });

  return { typeDefinitions, typesInput };
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createServer } from "http";

import { stitchSchemas } from "@graphql-tools/stitch";
import { YogaServerOptions, createYoga } from "graphql-yoga";

const PORT = 8000;

export async function runGateway(
  // TODO (harshith): Change this to strict type check
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ExtensionClass: any,
  portNumber: number = PORT,
  // TODO (harshith): Change this to strict type check
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yogaOptions: YogaServerOptions<any, any> = {}
) {
  const Class = new ExtensionClass();
  const schema = stitchSchemas({
    subschemas: [await Class.schema(), await Class.additionalSchema()],
  });
  const yoga = createYoga({
    schema,
    graphiql: false,
    landingPage: false,
    maskedErrors: false,
    context: async ({ request }: { request: Request }) => {
      const config64 = request.headers.get("config") ?? null;
      if (config64) {
        const buff = new Buffer(config64, "base64");
        let config = buff.toString("utf8");
        config = JSON.parse(config);

        // This to check if the base64 is still not parsed to JSON
        if (typeof config === "string") {
          config = JSON.parse(config);
        }

        return {
          config,
        };
      }

      return {};
    },
    ...yogaOptions,
  });

  const server = createServer(yoga);
  server.listen(portNumber, () => {
    console.info(`Server is running on ${portNumber}`);
  });
}

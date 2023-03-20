/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { createServer } from "http";

import { stitchSchemas } from "@graphql-tools/stitch";
import { YogaServerOptions, createYoga } from "graphql-yoga";

import { getJSONFrombase64 } from "./bases/utils";

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
      const parsedHeaders64 = request.headers.get("authHeaders") ?? null;

      const config = getJSONFrombase64(config64);
      const parsedHeaders = getJSONFrombase64(parsedHeaders64);

      return { config, parsedHeaders };
    },
    ...yogaOptions,
  });

  const server = createServer(yoga);
  server.listen(portNumber, () => {
    console.info(`Server is running on ${portNumber}`);
  });
}

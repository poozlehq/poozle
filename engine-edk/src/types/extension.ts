/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Executor } from "@graphql-tools/utils";
import { GraphQLSchema } from "graphql";

const enum SchemaType {
  "GRAPHQL" = "GRAPHQL",
  "REST" = "REST",
}

const enum InputType {
  input = "input",
}

// This will be used to generate form in the UI
// and then later passed to respective queries
export interface Input {
  name: string;
  key: string;
  description: string;
  type: InputType;
}

export interface Spec {
  name: string;
  key: string;
  description?: string;
  icon: string;
  type: SchemaType;
  inputBlocks: Input[];
}

// This is used to fetch the parsed credentails from the header
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Context = Record<string, any>;

// Generic holder of config for extension
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Config = Record<string, any>;

export interface SubschemaConfig {
  schema: GraphQLSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  executor: Executor<any>;
}

export type SchemaResponse = Promise<GraphQLSchema | SubschemaConfig>;
export type AuthHeaderResponse = Promise<
  Record<string, string | number | boolean>
>;
export type SpecResponse = Promise<Spec | undefined>;
export interface CheckResponseType {
  status: boolean;
  error?: string;
}
export type CheckResponse = Promise<CheckResponseType>;

export interface BaseExtensionInterface {
  // This will return GRAPHQL Schema
  schema(): SchemaResponse;
  // Return the spec json
  spec(): SpecResponse;
  // Check if passed config is valid
  check(config: string): CheckResponse;
  // Return Auth headers to send to be sent in the query
  authHeaders(config: Config): AuthHeaderResponse;
}

export type BaseURLResponse = Promise<string | undefined>;

export { SchemaType, InputType };

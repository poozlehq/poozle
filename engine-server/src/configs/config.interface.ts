/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
}

export interface NestConfig {
  port: number;
  graphql_port: number;
  graphql_gateway_port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

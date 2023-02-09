/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface Config {
  nest: NestConfig;
  workspace?: WorkspaceConfig;
}

export interface NestConfig {
  port: number;
  gateway_port: number;
}

export interface WorkspaceConfig {
  workspaceId: string;
}

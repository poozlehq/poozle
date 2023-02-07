/** Copyright (c) 2022, Poozle, all rights reserved. **/

export interface ExtensionRouterRequestIdBody {
  extensionRouterId: string;
}

export interface ExtensionRouterCreateBody {
  extensionDefinitionId: string;
  endpoint: string;
}

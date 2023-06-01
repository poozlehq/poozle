/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { AppInfo } from 'supertokens-node/types';

export const ConfigInjectionToken = 'ConfigInjectionToken';

export interface AuthModuleConfig {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
}

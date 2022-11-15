/** Copyright (c) 2022, Poozle, all rights reserved. **/

import type { ReactNode } from 'react';

export interface SpotlightAction {
  /** Action id, may be used to trigger action or find it in actions array, if not provided random string will be generated instead */
  id?: string;

  /** Action title, topmost large text, used for default filtering */
  title: string;

  /** Action description, small text displayed after title, used for default filtering */
  description?: string;

  /** Action group, used to render group label */
  group?: string;

  /** Keywords that are used for default filtering, not displayed anywhere, can be a string: "react,router,javascript" or an array: ['react', 'router', 'javascript'] */
  keywords?: string | string[];

  /** Decorative icon */
  icon?: ReactNode;

  image?: string;

  default?: boolean;

  /** Function that is called when action is triggered */
  onTrigger(action: SpotlightAction, text?: string): void;

  /** Any other properties that will be consumed by SpotlightProvider */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

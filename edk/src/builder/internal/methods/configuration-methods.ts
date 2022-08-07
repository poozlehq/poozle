/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */

import { Builder } from '../build_lib';
import { Prop } from '../constants';

export abstract class Multiline extends Builder {
  public multiline(boolean = true): this {
    return this.set(boolean, Prop.Multiline);
  }
}

export abstract class Optional extends Builder {
  public optional(boolean = true): this {
    return this.set(boolean, Prop.Optional);
  }
}

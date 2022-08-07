/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */

import { Builder } from '../lib';
import { Prop } from '../constants';

import type { OptionBuilder, OptionGroupBuilder } from '../../bits';
import type { Appendable, FilterString } from '../types';

export abstract class Blocks<T> extends Builder {
  public blocks(...blocks: Appendable<T>): this {
    return this.append(blocks.flat(), Prop.Blocks);
  }
}

export abstract class Elements<T> extends Builder {
  public elements(...elements: Appendable<T>): this {
    return this.append(elements.flat(), Prop.Elements);
  }
}

export abstract class Filter extends Builder {
  public filter(...filters: Appendable<FilterString>): this {
    return this.append(filters.flat(), Prop.Filter);
  }
}

export abstract class InitialOptions extends Builder {
  public initialOptions(...options: Appendable<OptionBuilder>): this {
    return this.append(options.flat(), Prop.InitialOptions);
  }
}

export abstract class OptionGroups extends Builder {
  public optionGroups(...optionGroups: Appendable<OptionGroupBuilder>): this {
    return this.append(optionGroups.flat(), Prop.OptionGroups);
  }
}

export abstract class Options extends Builder {
  public options(...options: Appendable<OptionBuilder>): this {
    return this.append(options.flat(), Prop.Options);
  }
}

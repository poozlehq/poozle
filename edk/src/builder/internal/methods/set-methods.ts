/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */

import { Builder } from '../build_lib';
import { Prop } from '../constants';

import type { QuickActionTypeEnum, QuickActionValueType, Settable } from '../types';
import { OptionBuilder } from '../../bits';

export abstract class ActionId extends Builder {
  public actionId(actionId: Settable<string>): this {
    return this.set(actionId, Prop.ActionId);
  }
}

export abstract class AltText extends Builder {
  public altText(altText: Settable<string>): this {
    return this.set(altText, Prop.AltText);
  }
}

export abstract class BlockId extends Builder {
  public blockId(blockId: Settable<string>): this {
    return this.set(blockId, Prop.BlockId);
  }
}

export abstract class Description extends Builder {
  public description(description: Settable<string>): this {
    return this.set(description, Prop.Description);
  }
}

export abstract class Element<T> extends Builder {
  public element(element: Settable<T>): this {
    return this.set(element, Prop.Element);
  }
}

export abstract class CallbackId extends Builder {
  public callbackId(callbackId: Settable<string>): this {
    return this.set(callbackId, Prop.CallbackId);
  }
}

export abstract class ConditionalCheck extends Builder {
  public conditionalCheck(conditionalCheck: Settable<Array<string>>): this {
    return this.set(conditionalCheck, Prop.ConditionalCheck);
  }
}

export abstract class Hint extends Builder {
  public hint(hint: Settable<string>): this {
    return this.set(hint, Prop.Hint);
  }
}

export abstract class ImageUrl extends Builder {
  public imageUrl(url: Settable<string>): this {
    return this.set(url, Prop.ImageUrl);
  }
}

export abstract class InitialDate extends Builder {
  public initialDate(date: Settable<Date>): this {
    return this.set(date, Prop.InitialDate);
  }
}

export abstract class InitialOption extends Builder {
  public initialOption(option: Settable<OptionBuilder>): this {
    return this.set(option, Prop.InitialOption);
  }
}

export abstract class InitialTime extends Builder {
  public initialTime(time: Settable<string>): this {
    return this.set(time, Prop.InitialTime);
  }
}

export abstract class InitialValue extends Builder {
  public initialValue(value: Settable<string>): this {
    return this.set(value, Prop.InitialValue);
  }
}

export abstract class Label extends Builder {
  public label(label: Settable<string>): this {
    return this.set(label, Prop.Label);
  }
}

export abstract class MaxLength extends Builder {
  public maxLength(length: Settable<number>): this {
    return this.set(length, Prop.MaxLength);
  }
}

export abstract class MaxSelectedItems extends Builder {
  public maxSelectedItems(quantity: Settable<number>): this {
    return this.set(quantity, Prop.MaxSelectedItems);
  }
}

export abstract class MinQueryLength extends Builder {
  public minQueryLength(length: Settable<number>): this {
    return this.set(length, Prop.MinQueryLength);
  }
}

export abstract class MinLength extends Builder {
  public minLength(length: Settable<number>): this {
    return this.set(length, Prop.MinLength);
  }
}

export abstract class Placeholder extends Builder {
  public placeholder(placeholder: Settable<string>): this {
    return this.set(placeholder, Prop.Placeholder);
  }
}

export abstract class Text extends Builder {
  public text(text: Settable<string>): this {
    return this.set(text, Prop.Text);
  }
}

export abstract class Icon extends Builder {
  public icon(icon: Settable<string>): this {
    return this.set(icon, Prop.Icon);
  }
}

export abstract class Title extends Builder {
  public title(title: Settable<string>): this {
    return this.set(title, Prop.Title);
  }
}

export abstract class QuickActionType extends Builder {
  public quickActionType(quickActionType: Settable<QuickActionTypeEnum>): this {
    return this.set(quickActionType, Prop.QuickActionType);
  }
}

export abstract class QuickActionValue extends Builder {
  public value(value: Settable<QuickActionValueType>): this {
    return this.set(value, Prop.Value);
  }
}


export abstract class TitleUrl extends Builder {
  public titleUrl(titleUrl: Settable<string>): this {
    return this.set(titleUrl, Prop.TitleUrl);
  }
}

export abstract class Url extends Builder {
  public url(url: Settable<string>): this {
    return this.set(url, Prop.Url);
  }
}

export abstract class Value extends Builder {
  public value(value: Settable<string>): this {
    return this.set(value, Prop.Value);
  }
}

export abstract class VideoUrl extends Builder {
  public videoUrl(videoUrl: Settable<string>): this {
    return this.set(videoUrl, Prop.VideoUrl);
  }
}

export abstract class FetchDataId extends Builder {
  public fetchDataId(fetchDataId: Settable<string>): this {
    return this.set(fetchDataId, Prop.FetchDataId);
  }
}

export abstract class SearchDataId extends Builder {
  public searchDataId(searchDataId : Settable<string>): this {
    return this.set(searchDataId, Prop.searchDataId);
  }
}
/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */

import { Builder } from '../lib';
import { BlockDto } from '../dto';

export abstract class BuildToJSON extends Builder {
  public buildToJSON(): string {
    const result = this.build();

    return JSON.stringify(result);
  }
}

export abstract class BuildToObject<T> extends Builder {
  public buildToObject(): Readonly<T> {
    return this.build();
  }
}

export abstract class End extends Builder {
  public end(): this {
    return this;
  }
}

export abstract class GetBlocks extends Builder {
  public getBlocks(): Readonly<BlockDto>[] {
    this.build();

    return this.build().blocks;
  }
}

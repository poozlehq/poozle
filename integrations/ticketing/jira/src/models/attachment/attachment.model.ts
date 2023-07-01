/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BaseModel, UserSchema } from '@poozle/engine-idk';

import { AttachmentPath } from './attachment.path';
import { AttachmentsPath } from './attachments.path';

export class JiraAttachmentModel extends BaseModel {
  constructor() {
    super('JiraAttachmentModel', UserSchema);
  }

  paths() {
    return [
      new AttachmentsPath(/^\/?attachments$/g, 'GET', this.schema),
      new AttachmentPath(/^\/?attachments+/g, 'GET', this.schema),
    ];
  }
}

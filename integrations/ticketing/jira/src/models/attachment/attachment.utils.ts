import { Attachment } from '@poozle/engine-edk';

export function convertAttachment(data: any): Partial<Attachment> {
  return {
    id: data.attachmentId,
    file_name: data.filename,
    content_type: data.mimeType,
    uploaded_by: {id: data.author.key, username: data.author.displayName},
    created_at: data.created
  };
}

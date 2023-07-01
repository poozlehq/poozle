/** Copyright (c) 2023, Poozle, all rights reserved. **/

export function convertAttachment(data: any) {
  return {
    id: data.attachmentId,
    file_name: data.filename,
    content_type: data.mimeType,
    uploaded_by: { id: data.author.key, username: data.author.displayName },
    created_at: data.created,
    raw_data: data,
  };
}

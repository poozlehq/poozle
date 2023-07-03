/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/
import {Recipient} from '@poozle/engine-idk'

export interface messageResponse {
  id: string;
  thread_id: string;
}

interface files{
  content_id: string,
  content_type: string,
  filename: string
}



function getReceipts(data: string) {
  const regex = /([\w\s]+)<([\w.-]+@[\w.-]+)>|([\w.-]+@[\w.-]+)/g 

  let result = [] as Recipient[];
  data.split(', ').forEach((value: any) => {
    const match = value.replace(/\\"/g, '').match(regex);
    if (match) {
      const name = match.length>1 ? match[0]: "";
      const email = match.length>1 ? match[1] : match[0] ;
      console.log(name, email)
      result.push({ "name": name, "email": email });
    }
  });
  return result;
}




function flattenParts(parts: any[]) {
  let flattenedParts: any[] = [];

  for (const part of parts) {
    const flattenedPart = {
      mimeType: part.mimeType,
      filename: part.filename,
      headers: part.headers.reduce((acc: any, header: any) => ({ ...acc, [header.name]: header.value }), {}),
      body: part.body.data ?? '',
      size: part.body.size,
    };

    const nestedParts = part.parts ? flattenParts(part.parts) : [];
    flattenedParts.push(flattenedPart, ...nestedParts);
  }

  return flattenedParts;
}

function extractBody(parts: any): { textBody: string, htmlBody: string, files: any[] } {
  const response = { textBody: '', htmlBody: '', files: [] as files[] };
  const flattenedParts = flattenParts(parts);

  flattenedParts.forEach((part: any) => {
    if (part.mimeType.includes('plain')) {
      response.textBody = Buffer.from(part.body, 'base64').toString('utf-8');
    } else if (part.mimeType.includes('html')) {
      response.htmlBody = Buffer.from(part.body, 'base64').toString('utf-8');
    } else {
      response.files.push({
        content_id: part.headers['X-Attachment-Id'],
        content_type: part.mimeType,
        filename: part.filename,
      });
    }
  });

  return response;
}


export function convertMessage(data: any) {
  const responseHeaders = data.payload.headers.reduce(
    (acc: any, header: any) => ({ ...acc, [header.name]: header.value }),
    {}
  );

  const labels = new Set(data.labelIds);
  const body = extractBody(data.payload.parts);

  return {
    id: data.id,
    body: body.textBody,
    html_body: body.htmlBody,
    user_id: responseHeaders['Delivered-To'],
    date: Date.parse(responseHeaders.Date) / 1000,
    snippet: data.snippet,
    subject: responseHeaders.Subject ?? '',
    thread_id: data.threadId,
    starred: labels.has('STARRED'),
    unread: labels.has('UNREAD'),
    cc: getReceipts(responseHeaders.Cc ?? ''),
    bcc: getReceipts(responseHeaders.Bcc ?? ''),
    from: getReceipts(responseHeaders.From ?? ''),
    reply_to: getReceipts(responseHeaders['Reply-To'] ?? ''),
    labels: data.labelIds,
    files: body.files,
  };
}

export const ticketMappings = {
  name: 'title',
  description: 'body',
  assignees: 'assignees',
  tags: 'label',
  status: 'state',
};

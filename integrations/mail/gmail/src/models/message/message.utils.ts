/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/
import { Recipient } from '@poozle/engine-idk';

export interface messageResponse {
  id: string;
  thread_id: string;
}

interface file {
  content_id: string;
  content_type: string;
  filename: string;
}
interface extractedBody {
  textBody: string;
  htmlBody: string;
  files: file[];
}

function getReceipts(data: string) {
  const regex = /([\w\s]+)<([\w.-]+@[\w.-]+)>|([\w.-]+@[\w.-]+)/g;

  const result = [] as Recipient[];
  data.split(', ').forEach((value: any) => {
    const match = value.replace(/\\"/g, '').match(regex);
    if (match) {
      const name = match.length > 1 ? match[0] : '';
      const email = match.length > 1 ? match[1] : match[0];

      result.push({ name, email });
    }
  });
  return result;
}

function flattenParts(parts: any[]) {
  const flattenedParts: any[] = [];

  for (const part of parts) {
    const flattenedPart = {
      mimeType: part.mimeType,
      filename: part.filename,
      headers: part.headers?.reduce(
        (acc: any, header: any) => ({ ...acc, [header.name]: header.value }),
        {},
      ),
      body: part.body.data ?? '',
      size: part.body.size,
    };

    const nestedParts = part.parts ? flattenParts(part.parts) : [];
    flattenedParts.push(flattenedPart, ...nestedParts);
  }

  return flattenedParts;
}

function extractBody(parts: any): extractedBody {
  const response: extractedBody = { textBody: '', htmlBody: '', files: [] };
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
    {},
  );

  const labels = new Set(data.labelIds);
  const body = data.payload.parts ? extractBody(data.payload.parts) : extractBody([data.payload]);

  return {
    id: data.id,
    body: body.textBody,
    html_body: body.htmlBody,
    user_id: labels.has('SENT') ? responseHeaders['From'] : responseHeaders['Delivered-To'],
    date: Date.parse(responseHeaders.Date) / 1000,
    snippet: data.snippet,
    subject: responseHeaders.Subject ?? '',
    thread_id: data.threadId,
    starred: labels.has('STARRED'),
    unread: labels.has('UNREAD'),
    in_reply_to: responseHeaders['Message-ID'] ?? '',
    cc: getReceipts(responseHeaders.Cc ?? ''),
    bcc: getReceipts(responseHeaders.Bcc ?? ''),
    from: getReceipts(responseHeaders.From ?? ''),
    reply_to: getReceipts(responseHeaders['Reply-To'] ?? ''),
    labels: data.labelIds,
    files: body.files,
    raw_data: data
  };
}

function convertToEmail(data: any) {
  const result = [] as string[];
  data.map((recipient: Recipient) => {
    console.log(recipient)
    result.push(`${recipient.name} <${recipient.email}>`);
  });

  return result.join(', ');
}

function createPlain(text: string) {
  return [
    'Content-Type: text/plain; charset="UTF-8"\r\n',
    'MIME-Version: 1.0\r\n',
    'Content-Transfer-Encoding: 7bit\r\n\r\n',
    text,
  ].join('');
}

function createHtml(html: string) {
  return [
    'Content-Type: text/html; charset="UTF-8"\r\n',
    'MIME-Version: 1.0\r\n',
    'Content-Transfer-Encoding: 7bit\r\n\r\n',
    html,
  ].join('');
}

function createAlternative(text: string, html: string, boundary: string) {
  return [
    `Content-Type: multipart/alternative; boundary="${boundary}"\r\n\r\n`,

    `--${boundary}\r\n`,
    createPlain(text),
    '\r\n\r\n',

    `--${boundary}\r\n`,
    createHtml(html),
    '\r\n\r\n',

    `--${boundary}`,
  ].join('');
}

function createBody(text: string, html: string, boundary: string) {
  if (text && html) {
    return createAlternative(text, html, boundary);
  }

  if (text) {
    return createPlain(text);
  }

  if (html) {
    return createHtml(html);
  }

  return '';
}

function createAttachments(attachments: any, boundary: string) {
  const result = [] as string[];

  attachments?.map((attachment: any) => {
    const attName = attachment.filename ? `; filename="${attachment.filename}"` : '';
    result.push(`--${boundary}\r\n`);
    result.push(`Content-Type: ${attachment.type}\r\n`);
    result.push('MIME-Version: 1.0\r\n');
    if (attachment.contentId) {
      result.push(`Content-ID: <${attachment.contentId}>\r\n`);
    }
    result.push('Content-Transfer-Encoding: base64\r\n');
    result.push(`Content-Disposition: attachment${attName}\r\n\r\n`);
    result.push(`${attachment.content}\r\n\r\n`);
  });

  return result.join('');
}

const generateBoundary = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let boundary = '';
  for (let i = 0; i < 16; i++) {
    boundary += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return boundary;
};

export function constructRawEmail(data: any) {
  const boundary = generateBoundary();

  const body = createBody(data.body, data.html_body, boundary);
  const attachments = createAttachments(data.attachments, boundary);

  const headers = [
    `From: ${convertToEmail(data.from)}`,
    `To: ${convertToEmail(data.to)}`,
    `Subject: ${data.subject}`,
    ...(data.in_reply_to ? [`References: ${data.in_reply_to}`] : []),
    ...(data.in_reply_to ? [`In-Reply-To: ${data.in_reply_to}`] : []),
    ...(data.snippet ? [`Snippet: ${data.snippet}`] : []),
    ...(data.cc ? [`Cc: ${convertToEmail(data.cc)}`] : []),
    ...(data.bcc ? [`Bcc: ${convertToEmail(data.bcc)}`] : []),
    ...(data.reply_to ? [`Reply-To: ${convertToEmail(data.reply_to)}`] : []),
  ];

  let emailBody: string;
  if (attachments) {
    emailBody = [
      `Content-Type: multipart/mixed; boundary=${boundary}\r\n`,
      `${headers.join('\r\n')}\r\n`,

      `--${boundary}\r\n`,
      `${body}\r\n\r\n`,

      attachments,

      `--${boundary}--\r\n\r\n`,
    ].join('');
  } else {
    emailBody = [`${headers.join('\r\n')}\r\n`, `${body}--\r\n\r\n`].join('');
  }

  return Buffer.from(emailBody).toString('base64');
}

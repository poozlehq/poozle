/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Availablity, FreeBusy } from '@poozle/engine-idk';
import { Meta } from 'common';

export interface GmailMessageResponse {
  id: string;
  thread_id: string;
}

export interface File {
  content_id: string;
  content_type: string;
  filename: string;
}

export interface ExtractedBody {
  textBody: string;
  htmlBody: string;
  files: File[];
}

export interface FreeBusyParams {
  queryParams: {
    limit: number;
    cursor?: string;
  };
}

export interface FreeBusyParams {
  requestBody: {
    start_time: string;
    end_time: string;
    timezone: string;
  };

  queryParams: {
    limit: number;
    cursor?: string;
  };
  pathParams: {};
}

export interface CalenderListResponse {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  timeZone: string;
  summaryOverride: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  selected: boolean;
  accessRole: string;
}

export interface BusyType {
  busy: {
    start: string;
    end: string;
  }[];
}

export interface FreeBusyCalendar {
  [key: string]: BusyType;
}

export interface FreeBusySourceResponse {
  kind: string;
  timeMin: string;
  timeMax: string;
  groups: any;
  calendars: FreeBusyCalendar;
}

export interface AvailablityResponse {
  data: Availablity;
  meta: Meta;
}

export interface FreeBusyResponse {
  data: FreeBusy[];
  meta: Meta;
}

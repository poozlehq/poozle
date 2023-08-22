/* eslint-disable @typescript-eslint/no-unused-vars */
/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BasePath, Config } from '@poozle/engine-idk';
import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from 'common';

import { CalenderListResponse, FreeBusyParams } from './calendar.interface';
import { convertFreeBusy, getCalendars } from './calendar.utils';

export class FreeBusyPath extends BasePath {
  async fetchFreeBusy(url: string, headers: AxiosHeaders, params: FreeBusyParams) {
    const calendarListResponse = await getCalendars(
      `${BASE_URL}/users/me/calendarList`,
      headers,
      params,
    );

    const calendars = calendarListResponse.map((calendar: CalenderListResponse) => {
      return { id: calendar.id };
    });

    const freeBusyBody = {
      timeMin: params.requestBody.start_time,
      timeMax: params.requestBody.end_time,
      timeZone: params.requestBody.timezone,
      items: calendars,
    };

    const response = await axios.post(url, freeBusyBody, { headers });

    return { data: convertFreeBusy(response.data, calendarListResponse, params) };
  }

  async run(method: string, headers: AxiosHeaders, params: FreeBusyParams, _config: Config) {
    let url = '';
    switch (method) {
      case 'POST':
        url = `${BASE_URL}/freeBusy`;
        return this.fetchFreeBusy(url, headers, params);

      default:
        throw new Error(`Unknown method ${method}`);
    }
  }
}

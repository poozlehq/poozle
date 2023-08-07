/* eslint-disable @typescript-eslint/no-explicit-any */
/** Copyright (c) 2023, Poozle, all rights reserved. **/
import axios, { AxiosHeaders } from 'axios';

import {
  FreeBusyParams,
  CalenderListResponse,
  FreeBusySourceResponse,
  BusyType,
} from './calendar.interface';

import { Availablity, FreeBusy, StatusType } from '@poozle/engine-idk';

import { isWithinInterval, parseISO } from 'date-fns';

export async function getCalendars(
  url: string,
  headers: AxiosHeaders,
  params: FreeBusyParams,
): Promise<CalenderListResponse[]> {
  let finalParams = {
    maxResults: params.queryParams?.limit,
    ...(params.queryParams?.cursor && { pageToken: params.queryParams?.cursor }),
  };
  const calendarListResponse = await axios({
    url,
    headers,
    params: finalParams,
  });

  let calendars = calendarListResponse.data.items as CalenderListResponse[];
  if (calendarListResponse.data?.nextPageToken) {
    params.queryParams.cursor = calendarListResponse.data.nextPageToken;
    const response = await getCalendars(url, headers, params);
    calendars = [...calendars, ...response];
  }

  return calendars;
}

export function convertFreeBusy(
  data: FreeBusySourceResponse,
  calendarListResponse: CalenderListResponse[],
  params: FreeBusyParams,
): FreeBusy[] {
  const calendars = calendarListResponse.map((calendar: CalenderListResponse) => {
    return { id: calendar.id, description: calendar.summary };
  });

  const freeBusyArray: FreeBusy[] = [];
  Object.entries(data.calendars).forEach(([id, calendar]) => {
    const busyCalendar = calendar as BusyType;
    const matchedCalendar = calendars.find((calendar) => calendar.id === id);

    if (busyCalendar.busy.length === 0) {
      freeBusyArray.push({
        id,
        description: matchedCalendar ? matchedCalendar.description : '',
        timezone: params.requestBody.timezone,
        start_time: params.requestBody.start_time,
        end_time: params.requestBody.end_time,
        status: StatusType.free,
      });
    } else {
      busyCalendar.busy.forEach((timeslot) => {
        freeBusyArray.push({
          id,
          description: matchedCalendar ? matchedCalendar.description : '',
          timezone: params.requestBody.timezone,
          start_time: timeslot.start,
          end_time: timeslot.end,
          status: StatusType.busy,
        });
      });
    }
  });

  return freeBusyArray;
}

export function getAvailability(data: FreeBusySourceResponse, params: FreeBusyParams): Availablity {
  const requestInterval = {
    start: parseISO(params.requestBody.start_time),
    end: parseISO(params.requestBody.end_time),
  };

  let status = StatusType.free;

  Object.entries(data.calendars).forEach(([_id, calendar]) => {
    const busyCalendar = calendar as BusyType;

    busyCalendar.busy.forEach((timeslot) => {
      const timeslotInterval = {
        start: parseISO(timeslot.start),
        end: parseISO(timeslot.end),
      };

      if (
        isWithinInterval(requestInterval.start, timeslotInterval) ||
        isWithinInterval(requestInterval.end, timeslotInterval)
      ) {
        status = StatusType.busy;
      }
    });
  });

  return {
    timezone: params.requestBody.timezone,
    start_time: params.requestBody.start_time,
    end_time: params.requestBody.end_time,
    status: status,
  };
}

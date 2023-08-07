/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Timeslot {
  starttime: string;
  endtime: string;
  status: StatusType;
}

export interface FreeBusy {
  id: string;
  description: string;
  timezone: string;
  start_time: string;
  end_time: string;
  status: StatusType;
}

export enum StatusType {
  free = 'free',
  busy = 'busy',
}

export interface Availablity {
  timezone: string;
  start_time: string;
  end_time: string;
  status: StatusType;
}

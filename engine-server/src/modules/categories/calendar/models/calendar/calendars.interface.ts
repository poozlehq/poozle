/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { IsString } from 'class-validator';

import { Meta, StatusType } from '@poozle/engine-idk';

import { JustRawParams } from 'common/interfaces/query.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CommonMessageQueryParams extends JustRawParams {}

export class Timeslot {
  /**
   * Start Time of the event
   */
  starttime: string;

  /**
   * End Time of the event
   */
  endtime: string;

  /**
   * Status of the event
   */
  status: StatusType;
}

export class FreeBusy {
  /**
   * Calender Id for the event
   */
  id: string;

  /**
   * Calendar Description
   */
  description: string;

  /**
   * Timezone of the event
   */
  timezone: string;

  /**
   * Start Time of the event
   */
  start_time: string;

  /**
   * End Time of the event
   */
  end_time: string;

  @ApiProperty({
    enum: StatusType,
    description: 'Status of the event',
  })
  status: StatusType;
}

export class Availablity {
  /**
   * Timezone of the event
   */
  timezone: string;

  /**
   * Start Time of the event
   */
  start_time: string;

  /**
   * End Time of the event
   */
  end_time: string;
  @ApiProperty({
    enum: StatusType,
    description: 'Status of the event',
  })
  status: StatusType;
}

export class AvalabilityResponse {
  data: Availablity;
}
export class FreeBusyResponse {
  data: FreeBusy[];
  meta: Meta;
}

export class FreeBusyBody {
  @IsString()
  start_time: string;
  @IsString()
  end_time: string;
  @IsString()
  timezone: string;
}

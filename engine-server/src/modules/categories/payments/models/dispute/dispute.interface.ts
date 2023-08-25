/** Copyright (c) 2023, Poozle, all rights reserved. **/

import {
  Charge,
  Dispute,
  DisputeReason,
  DisputeStatus,
  Evidence,
} from '@poozle/engine-idk';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class DisputeQueryParams extends QueryParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;

  @IsOptional()
  @IsString()
  @IsEnum(DisputeReason)
  reason?: DisputeReason;

  @IsOptional()
  @IsString()
  @IsEnum(DisputeStatus)
  status?: DisputeStatus;
}

export class GetDisputeQueryParams extends JustRawParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class DisputeWithIaId implements Dispute {
  id: string;
  amount: string;
  charge_id: string;
  currency: string;
  reason: string;
  evidence: Evidence;
  status: string;
  priority: string;
  is_charge_refundable: boolean;
  created_at: string;

  charge?: Charge;
  integration_account_id?: string;
}

export const DISPUTE_KEYS = [
  'id',
  'amount',
  'charge_id',
  'currency',
  'reason',
  'evidence',
  'status',
  'priority',
  'is_charge_refundable',
  'created_at',
];

export class DisputesResponse {
  data: Dispute[];
  meta: Meta;
}

export class DisputeResponse {
  data: Dispute;
}

export class PathParamsWithDisputeId {
  @IsString()
  dispute_id: string;
}

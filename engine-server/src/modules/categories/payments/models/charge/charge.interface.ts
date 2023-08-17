/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import {
  BillingDetails,
  Charge,
  Outcome,
  PaymentMethod,
  PaymentMethodStatus,
} from '@poozle/engine-idk';

import { JustRawParams, QueryParams } from 'common/interfaces/query.interface';
import { Meta } from 'common/interfaces/response.interface';

export class ChargeQueryParams extends QueryParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class GetChargeQueryParams extends JustRawParams {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' || value === 'True' || value === true;
  })
  realtime?: boolean = false;
}

export class ChargeWithIaId implements Charge {
  id: string;
  amount: string;
  amount_refunded: string;
  application: string;
  application_fee_amount: string;
  billing_details: BillingDetails;
  captured: boolean;
  created_at: string;
  currency: string;
  description: string;
  disputed: boolean;
  failure_code: string;
  failure_message: string;
  invoice: string;
  metadata: any;
  outcome: Outcome;
  paid: boolean;
  payment_method: PaymentMethod;
  email: string;
  contact: string;
  status: PaymentMethodStatus;

  integration_account_id?: string;
}

export const CHARGE_KEYS = [
  'id',
  'amount',
  'amount_refunded',
  'application',
  'application_fee_amount',
  'billing_details',
  'captured',
  'created_at',
  'currency',
  'description',
  'disputed',
  'failure_code',
  'failure_message',
  'invoice',
  'metadata',
  'outcome',
  'paid',
  'payment_method',
  'email',
  'contact',
  'status',
];

export class ChargesResponse {
  data: ChargeWithIaId[];
  meta: Meta;
}

export class ChargeResponse {
  data: ChargeWithIaId;
}

export class PathParamsWithChargeId {
  @IsString()
  charge_id: string;
}

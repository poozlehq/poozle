/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: number;
}

export interface BillingDetails {
  address: Address;
  email: string;
  name: string;
  phone: string;
}

export interface PaymentMethod {
  type: PaymentMethodType;
  details: PaymentDetails;
}

export interface PaymentDetails {
  [key: string]: any;
}

export interface Outcome {
  network_status: string;
  reason: string;
  risk_level: string;
  seller_message: string;
  type: string;
}

export interface Charge {
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
}

export enum PaymentMethodType {
  ach_credit_transfer = 'ach_credit_transfer',
  ach_debit = 'ach_debit',
  acss_debit = 'acss_debit',
  alipay = 'alipay',
  au_becs_debit = 'au_becs_debit',
  bancontact = 'bancontact',
  card = 'card',
  card_present = 'card_present',
  eps = 'eps',
  giropay = 'giropay',
  ideal = 'ideal',
  klarna = 'klarna',
  multibanco = 'multibanco',
  p24 = 'p24',
  sepa_debit = 'sepa_debit',
  sofort = 'sofort',
  stripe_account = 'stripe_account',
  wechat = 'wechat',
  netbank = 'netbank',
  wallet = 'wallet',
  emi = 'emi',
  upi = 'upi',
}

export enum PaymentMethodStatus {
  created = 'created',
  authorized = 'authorized',
  succeeded = 'succeeded',
  refunded = 'refunded',
  failed = 'failed',
}

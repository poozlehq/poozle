/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { BillingDetails, Outcome, PaymentMethod } from '@poozle/engine-idk';
import { convertToDateTime } from 'common';
import { ChargeWithRaw } from './charge.interface';

function extractPaymentMethods(paymentData: any): PaymentMethod {
  const type = paymentData.type;
  return {
    type: paymentData.type,
    details: paymentData[type],
  };
}

function extractBillingDetails(billingData: any): BillingDetails {
  const address = {
    city: billingData.address.city,
    country: billingData.address.country,
    line1: billingData.address.line1,
    line2: billingData.address.line2,
    postal_code: billingData.address.postal_code,
    state: billingData.address.state,
  };

  return {
    address: address,
    email: billingData.email,
    name: billingData.name,
    phone: billingData.phone,
  };
}

function extractOutcome(chargeData: any): Outcome {
  return {
    network_status: chargeData.network_status,
    reason: chargeData.reason,
    risk_level: chargeData.risk_level,
    seller_message: chargeData.seller_message,
    type: chargeData.type,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertCharge(data: any): ChargeWithRaw {
  return {
    id: data.id,
    amount: data.amount?.toString(),
    amount_refunded: data.amount_refunded?.toString(),
    application: data.application,
    application_fee_amount: data.application_fee_amount?.toString(),
    billing_details: data.billing_details
      ? extractBillingDetails(data.billing_details)
      : ({} as BillingDetails),
    captured: data.captured,
    created_at: convertToDateTime(data.created),
    currency: data.currency,
    description: data.description,
    disputed: data.disputed,
    failure_code: data.failure_code,
    failure_message: data.failure_message,
    invoice: data.invoice,
    metadata: data.metadata,
    outcome: data.outcome ? extractOutcome(data.outcome) : ({} as Outcome),
    paid: data.paid,
    payment_method: data.payment_method_details
      ? extractPaymentMethods(data.payment_method_details)
      : ({} as PaymentMethod),
    email: data.receipt_email,
    contact: data.billing_details.phone ?? null,
    status: data.status,

    // Raw
    raw: data,
  };
}

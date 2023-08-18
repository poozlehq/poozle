/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { Evidence } from '@poozle/engine-idk';
import { convertToDateTime } from 'common';
import { DisputeWithRaw } from './dispute.interface';

function extractEvidence(data: any): Evidence {
  return {
    access_activity_log: data.evidence.access_activity_log,
    billing_address: data.evidence.billing_address,
    cancellation_policy: data.evidence.cancellation_policy,
    cancellation_policy_disclosure: data.evidence.cancellation_policy_disclosure,
    cancellation_rebuttal: data.evidence.cancellation_rebuttal,
    customer_communication: data.evidence.customer_communication,
    customer_email_address: data.evidence.customer_email_address,
    customer_name: data.evidence.customer_name,
    customer_purchase_ip: data.evidence.customer_purchase_ip,
    customer_signature: data.evidence.customer_signature,
    duplicate_charge_documentation: data.evidence.duplicate_charge_documentation,
    duplicate_charge_explanation: data.evidence.duplicate_charge_explanation,
    duplicate_charge_id: data.evidence.duplicate_charge_id,
    product_description: data.evidence.product_description,
    receipt: data.evidence.receipt,
    refund_policy: data.evidence.refund_policy,
    refund_policy_disclosure: data.evidence.refund_policy_disclosure,
    refund_refusal_explanation: data.evidence.refund_refusal_explanation,
    service_date: data.evidence.service_date,
    service_documentation: data.evidence.service_documentation,
    shipping_address: data.evidence.shipping_address,
    shipping_carrier: data.evidence.shipping_carrier,
    shipping_date: data.evidence.shipping_date,
    shipping_documentation: data.evidence.shipping_documentation,
    shipping_tracking_number: data.evidence.shipping_tracking_number,
    uncategorized_file: data.evidence.uncategorized_file,
    uncategorized_text: data.evidence.uncategorized_text,
    due_by: convertToDateTime(data.evidence_details.due_by),
    has_evidence: data.evidence_details.has_evidence,
    past_due: data.evidence_details.past_due,
    submission_count: data.evidence_details.submission_count?.toString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertDispute(data: any): DisputeWithRaw {
  return {
    id: data.id,
    amount: data.amount?.toString(),
    charge_id: data.charge,
    currency: data.currency,
    evidence: extractEvidence(data),
    status: data.status,
    priority: data.priority,
    reason: data.reason,
    created_at: convertToDateTime(data.created),
    is_charge_refundable: data.is_charge_refundable,
    // Raw
    raw: data,
  };
}

/** Copyright (c) 2023, Poozle, all rights reserved. **/

export interface Dispute {
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
}

export interface Evidence {
  access_activity_log: string;
  billing_address: string;
  cancellation_policy: string[];
  cancellation_policy_disclosure: string;
  cancellation_rebuttal: string;
  customer_communication: string[];
  customer_email_address: string;
  customer_name: string;
  customer_purchase_ip: string;
  customer_signature: string[];
  duplicate_charge_documentation: string[];
  duplicate_charge_explanation: string;
  duplicate_charge_id: string;
  product_description: string;
  receipt: string[];
  refund_policy: string[];
  refund_policy_disclosure: string;
  refund_refusal_explanation: string;
  service_date: string;
  service_documentation: string[];
  shipping_address: string;
  shipping_carrier: string;
  shipping_date: string;
  shipping_documentation: string[];
  shipping_tracking_number: string;
  uncategorized_file: string[];
  uncategorized_text: string;
  due_by: string;
  has_evidence: boolean;
  past_due: boolean;
  submission_count: string;
}

export enum DisputeReason {
  bank_cannot_process = 'bank_cannot_process',
  check_returned = 'check_returned',
  credit_not_processed = 'credit_not_processed',
  customer_initiated = 'customer_initiated',
  debit_not_authorized = 'debit_not_authorized',
  duplicate = 'duplicate',
  fraudulent = 'fraudulent',
  general = 'general',
  incorrect_account_details = 'incorrect_account_details',
  insufficient_funds = 'insufficient_funds',
  product_not_received = 'product_not_received',
  product_unacceptable = 'product_unacceptable',
  subscription_canceled = 'subscription_canceled',
  unrecognize = 'unrecognize',
}

export enum DisputeStatus {
  warning_needs_response = 'warning_needs_response',
  warning_under_review = 'warning_under_review',
  warning_closed = 'warning_closed',
  needs_response = 'needs_response',
  under_review = 'under_review',
  won = 'won',
  lost = 'lost',
}

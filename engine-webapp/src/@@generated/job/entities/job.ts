export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
}

export interface Job {
  jobId: string;
  temporalId: string;
  integrationAccountId: string;
  status: JobStatus;
  failedMessage: string | null;
  recordsSynced: number | null;
  logs: string | null;
  createdAt: Date;
  updatedAt: Date;
}

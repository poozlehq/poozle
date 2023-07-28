-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'RUNNING', 'FAILED', 'SUCCEEDED');

-- CreateTable
CREATE TABLE "Job" (
    "jobId" TEXT NOT NULL,
    "temporalId" TEXT NOT NULL,
    "integrationAccountId" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "recordsSynced" INTEGER NOT NULL,
    "logs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("jobId")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "IntegrationAccount"("integrationAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

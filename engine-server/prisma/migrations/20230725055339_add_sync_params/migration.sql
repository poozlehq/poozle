-- AlterTable
ALTER TABLE "IntegrationAccount" ADD COLUMN     "syncEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "syncPeriod" TEXT;

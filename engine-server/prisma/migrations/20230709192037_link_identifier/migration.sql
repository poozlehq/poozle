/*
  Warnings:

  - Added the required column `linkIdentifier` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "IntegrationType" ADD VALUE 'DOCS';

-- DropIndex
DROP INDEX "IntegrationAccount_integrationAccountName_workspaceId_key";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "integrationDefinitionId" TEXT,
ADD COLUMN     "linkIdentifier" TEXT NOT NULL;

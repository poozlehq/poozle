/*
  Warnings:

  - You are about to drop the column `integrationConnectLinkIntegrationConnectionLinkId` on the `IntegrationAccount` table. All the data in the column will be lost.
  - You are about to drop the `IntegrationConnectLink` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `workspaceId` on table `IntegrationOAuthApp` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "IntegrationAccount" DROP CONSTRAINT "IntegrationAccount_integrationConnectLinkIntegrationConnec_fkey";

-- DropForeignKey
ALTER TABLE "IntegrationConnectLink" DROP CONSTRAINT "IntegrationConnectLink_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "IntegrationOAuthApp" DROP CONSTRAINT "IntegrationOAuthApp_workspaceId_fkey";

-- AlterTable
ALTER TABLE "IntegrationAccount" DROP COLUMN "integrationConnectLinkIntegrationConnectionLinkId",
ADD COLUMN     "linkId" TEXT;

-- AlterTable
ALTER TABLE "IntegrationOAuthApp" ALTER COLUMN "workspaceId" SET NOT NULL;

-- DropTable
DROP TABLE "IntegrationConnectLink";

-- CreateTable
CREATE TABLE "Link" (
    "linkId" TEXT NOT NULL,
    "linkName" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL DEFAULT 3600,
    "category" "IntegrationType"[],
    "workspaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("linkId")
);

-- AddForeignKey
ALTER TABLE "IntegrationOAuthApp" ADD CONSTRAINT "IntegrationOAuthApp_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

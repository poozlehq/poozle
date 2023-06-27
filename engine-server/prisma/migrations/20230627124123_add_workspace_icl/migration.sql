/*
  Warnings:

  - Added the required column `workspaceId` to the `IntegrationConnectLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IntegrationConnectLink" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "IntegrationConnectLink" ADD CONSTRAINT "IntegrationConnectLink_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

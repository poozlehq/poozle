/*
  Warnings:

  - A unique constraint covering the columns `[integrationDefinitionId,workspaceId]` on the table `IntegrationOAuthApp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IntegrationOAuthApp_integrationDefinitionId_workspaceId_key" ON "IntegrationOAuthApp"("integrationDefinitionId", "workspaceId");

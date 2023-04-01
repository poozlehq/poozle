/*
  Warnings:

  - A unique constraint covering the columns `[extensionAccountName,workspaceId]` on the table `ExtensionAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAccount_extensionAccountName_workspaceId_key" ON "ExtensionAccount"("extensionAccountName", "workspaceId");

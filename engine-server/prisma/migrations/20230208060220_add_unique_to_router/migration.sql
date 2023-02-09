/*
  Warnings:

  - A unique constraint covering the columns `[extensionDefinitionId]` on the table `ExtensionRouter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropEnum
DROP TYPE "RunStatus";

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionRouter_extensionDefinitionId_key" ON "ExtensionRouter"("extensionDefinitionId");

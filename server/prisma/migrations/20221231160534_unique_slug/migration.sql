/*
  Warnings:

  - A unique constraint covering the columns `[extensionName]` on the table `Extension` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Extension_extensionName_key" ON "Extension"("extensionName");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

/*
  Warnings:

  - A unique constraint covering the columns `[extensionAuthName,workspaceId]` on the table `ExtensionAuth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `extensionAuthName` to the `ExtensionAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtensionAuth" ADD COLUMN     "extensionAuthName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAuth_extensionAuthName_workspaceId_key" ON "ExtensionAuth"("extensionAuthName", "workspaceId");

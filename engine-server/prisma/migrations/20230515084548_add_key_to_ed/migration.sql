/*
  Warnings:

  - A unique constraint covering the columns `[extensionDefinitionId,key]` on the table `ExtensionDefinition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `ExtensionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtensionDefinition" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionDefinition_extensionDefinitionId_key_key" ON "ExtensionDefinition"("extensionDefinitionId", "key");

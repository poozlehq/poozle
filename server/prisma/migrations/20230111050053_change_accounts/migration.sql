/*
  Warnings:

  - You are about to drop the `Extension` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Extension" DROP CONSTRAINT "Extension_extensionDefinitionId_fkey";

-- DropTable
DROP TABLE "Extension";

-- CreateTable
CREATE TABLE "ExtensionAccount" (
    "extensionAccountId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "connectionConfiguration" JSONB,
    "name" TEXT NOT NULL,
    "extensionAccountName" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "ExtensionAccount_pkey" PRIMARY KEY ("extensionAccountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAccount_extensionAccountName_key" ON "ExtensionAccount"("extensionAccountName");

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

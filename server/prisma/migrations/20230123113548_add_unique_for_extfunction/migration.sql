/*
  Warnings:

  - A unique constraint covering the columns `[extensionAccountId,key]` on the table `ExtensionFunction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `ExtensionFunction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ExtensionFunction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtensionFunction" ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionFunction_extensionAccountId_key_key" ON "ExtensionFunction"("extensionAccountId", "key");

/*
  Warnings:

  - You are about to drop the `ExtensionFunction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExtensionRun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtensionFunction" DROP CONSTRAINT "ExtensionFunction_extensionAccountId_fkey";

-- DropForeignKey
ALTER TABLE "ExtensionRun" DROP CONSTRAINT "ExtensionRun_extensionAccountId_fkey";

-- DropForeignKey
ALTER TABLE "ExtensionRun" DROP CONSTRAINT "ExtensionRun_extensionFunctionId_fkey";

-- DropTable
DROP TABLE "ExtensionFunction";

-- DropTable
DROP TABLE "ExtensionRun";

/*
  Warnings:

  - You are about to drop the column `spec` on the `ExtensionRouter` table. All the data in the column will be lost.
  - Added the required column `extensionFunctionId` to the `ExtensionRun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtensionRouter" DROP COLUMN "spec";

-- AlterTable
ALTER TABLE "ExtensionRun" ADD COLUMN     "extensionFunctionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ExtensionFunction" (
    "extensionFunctionId" TEXT NOT NULL,
    "extensionAccountId" TEXT NOT NULL,
    "inputParams" JSONB,

    CONSTRAINT "ExtensionFunction_pkey" PRIMARY KEY ("extensionFunctionId")
);

-- AddForeignKey
ALTER TABLE "ExtensionFunction" ADD CONSTRAINT "ExtensionFunction_extensionAccountId_fkey" FOREIGN KEY ("extensionAccountId") REFERENCES "ExtensionAccount"("extensionAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionRun" ADD CONSTRAINT "ExtensionRun_extensionFunctionId_fkey" FOREIGN KEY ("extensionFunctionId") REFERENCES "ExtensionFunction"("extensionFunctionId") ON DELETE RESTRICT ON UPDATE CASCADE;

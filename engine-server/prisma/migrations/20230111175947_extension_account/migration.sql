/*
  Warnings:

  - You are about to drop the column `connectionConfiguration` on the `ExtensionAccount` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `ExtensionAccount` table. All the data in the column will be lost.
  - Added the required column `functionEnv` to the `ExtensionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FunctionEnv" AS ENUM ('NODE');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('FAILED', 'SUCCESS');

-- AlterTable
ALTER TABLE "ExtensionAccount" DROP COLUMN "connectionConfiguration",
DROP COLUMN "icon",
ADD COLUMN     "extensionConfiguration" JSONB;

-- AlterTable
ALTER TABLE "ExtensionDefinition" ADD COLUMN     "functionEnv" "FunctionEnv" NOT NULL;

-- CreateTable
CREATE TABLE "ExtensionRouter" (
    "extensionRouterId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "spec" JSONB NOT NULL,

    CONSTRAINT "ExtensionRouter_pkey" PRIMARY KEY ("extensionRouterId")
);

-- CreateTable
CREATE TABLE "ExtensionRun" (
    "extensionRunId" TEXT NOT NULL,
    "extensionAccountId" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "status" "RunStatus" NOT NULL,
    "failure" JSONB,

    CONSTRAINT "ExtensionRun_pkey" PRIMARY KEY ("extensionRunId")
);

-- AddForeignKey
ALTER TABLE "ExtensionRouter" ADD CONSTRAINT "ExtensionRouter_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionRun" ADD CONSTRAINT "ExtensionRun_extensionAccountId_fkey" FOREIGN KEY ("extensionAccountId") REFERENCES "ExtensionAccount"("extensionAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

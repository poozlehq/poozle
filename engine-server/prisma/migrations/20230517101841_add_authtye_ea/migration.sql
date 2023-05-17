/*
  Warnings:

  - Added the required column `authType` to the `ExtensionAccount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('OAUTH', 'CUSTOM');

-- AlterTable
ALTER TABLE "ExtensionAccount" ADD COLUMN     "authType" "AuthType" NOT NULL;

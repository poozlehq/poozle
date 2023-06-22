/*
  Warnings:

  - Added the required column `sourceUrl` to the `IntegrationDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IntegrationDefinition" ADD COLUMN     "sourceUrl" TEXT NOT NULL;

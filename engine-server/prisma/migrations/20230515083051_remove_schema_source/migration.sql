/*
  Warnings:

  - You are about to drop the column `schemaSource` on the `ExtensionDefinition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExtensionDefinition" DROP COLUMN "schemaSource";

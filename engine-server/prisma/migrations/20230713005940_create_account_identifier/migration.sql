/*
  Warnings:

  - You are about to drop the column `linkIdentifier` on the `Link` table. All the data in the column will be lost.
  - Added the required column `accountIdentifier` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IntegrationAccount" ADD COLUMN     "accountIdentifier" TEXT;

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "linkIdentifier",
ADD COLUMN     "accountIdentifier" TEXT NOT NULL;

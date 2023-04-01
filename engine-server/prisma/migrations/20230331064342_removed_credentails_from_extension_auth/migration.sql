/*
  Warnings:

  - You are about to drop the column `credential` on the `ExtensionAuth` table. All the data in the column will be lost.
  - Added the required column `Scopes` to the `ExtensionAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `ExtensionAuth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientSecret` to the `ExtensionAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtensionAuth" DROP COLUMN "credential",
ADD COLUMN     "Scopes" TEXT NOT NULL,
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "clientSecret" TEXT NOT NULL;

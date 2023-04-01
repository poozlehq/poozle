/*
  Warnings:

  - You are about to drop the column `Scopes` on the `ExtensionAuth` table. All the data in the column will be lost.
  - Added the required column `scopes` to the `ExtensionAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtensionAuth" DROP COLUMN "Scopes",
ADD COLUMN     "scopes" TEXT NOT NULL;

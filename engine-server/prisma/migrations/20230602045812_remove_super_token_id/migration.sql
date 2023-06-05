/*
  Warnings:

  - You are about to drop the column `superTokenUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_superTokenUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "superTokenUserId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

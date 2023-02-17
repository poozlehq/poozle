/*
  Warnings:

  - Added the required column `updatedAt` to the `ExtensionAccount` table without a default value. This is not possible if the table is not empty.
  - Made the column `workspaceId` on table `ExtensionAccount` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `ExtensionDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExtensionRouter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExtensionSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExtensionAccount" DROP CONSTRAINT "ExtensionAccount_workspaceId_fkey";

-- AlterTable
ALTER TABLE "ExtensionAccount" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "workspaceId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ExtensionDefinition" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ExtensionRouter" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ExtensionSchema" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

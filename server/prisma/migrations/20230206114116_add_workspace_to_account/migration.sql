/*
  Warnings:

  - The values [API] on the enum `ExtensionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExtensionType_new" AS ENUM ('GRAPHQL', 'REST', 'CUSTOM');
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" DROP DEFAULT;
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" TYPE "ExtensionType_new" USING ("extensionType"::text::"ExtensionType_new");
ALTER TYPE "ExtensionType" RENAME TO "ExtensionType_old";
ALTER TYPE "ExtensionType_new" RENAME TO "ExtensionType";
DROP TYPE "ExtensionType_old";
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" SET DEFAULT 'GRAPHQL';
COMMIT;

-- AlterTable
ALTER TABLE "ExtensionAccount" ADD COLUMN     "workspaceId" TEXT;

-- AlterTable
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" SET DEFAULT 'GRAPHQL';

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

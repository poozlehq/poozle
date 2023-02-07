-- DropForeignKey
ALTER TABLE "ExtensionDefinition" DROP CONSTRAINT "ExtensionDefinition_workspaceId_fkey";

-- AlterTable
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "workspaceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExtensionDefinition" ADD CONSTRAINT "ExtensionDefinition_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

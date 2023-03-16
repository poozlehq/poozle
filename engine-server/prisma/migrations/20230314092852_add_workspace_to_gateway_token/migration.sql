-- AlterTable
ALTER TABLE "Gateway" ADD COLUMN     "workspaceId" TEXT;

-- AddForeignKey
ALTER TABLE "Gateway" ADD CONSTRAINT "Gateway_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

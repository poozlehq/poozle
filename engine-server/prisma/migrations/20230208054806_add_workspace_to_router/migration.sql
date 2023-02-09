-- AlterTable
ALTER TABLE "ExtensionRouter" ADD COLUMN     "workspaceId" TEXT;

-- CreateTable
CREATE TABLE "ExtensionSpec" (
    "extensionSpecId" TEXT NOT NULL,
    "spec" JSONB NOT NULL,
    "extensionAccountId" TEXT NOT NULL,

    CONSTRAINT "ExtensionSpec_pkey" PRIMARY KEY ("extensionSpecId")
);

-- AddForeignKey
ALTER TABLE "ExtensionRouter" ADD CONSTRAINT "ExtensionRouter_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionSpec" ADD CONSTRAINT "ExtensionSpec_extensionAccountId_fkey" FOREIGN KEY ("extensionAccountId") REFERENCES "ExtensionAccount"("extensionAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

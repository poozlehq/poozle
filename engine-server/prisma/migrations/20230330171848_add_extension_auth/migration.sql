-- CreateTable
CREATE TABLE "ExtensionAuth" (
    "extensionAuthId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "credential" JSONB NOT NULL,
    "workspaceId" TEXT,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtensionAuth_pkey" PRIMARY KEY ("extensionAuthId")
);

-- AddForeignKey
ALTER TABLE "ExtensionAuth" ADD CONSTRAINT "ExtensionAuth_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAuth" ADD CONSTRAINT "ExtensionAuth_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ExtensionType" AS ENUM ('API', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ReleaseStage" AS ENUM ('ALPHA', 'BETA', 'GENERALLY_AVAILABLE', 'CUSTOM');

-- CreateTable
CREATE TABLE "Workspace" (
    "workspaceId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspaceId")
);

-- CreateTable
CREATE TABLE "ExtensionDefinition" (
    "extensionDefinitionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "functionUrl" TEXT NOT NULL,
    "icon" TEXT,
    "releaseStage" "ReleaseStage" NOT NULL DEFAULT 'ALPHA',
    "extensionType" "ExtensionType" NOT NULL DEFAULT 'API',
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "ExtensionDefinition_pkey" PRIMARY KEY ("extensionDefinitionId")
);

-- CreateTable
CREATE TABLE "Extension" (
    "extensionId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "connectionConfiguration" JSONB,
    "name" TEXT NOT NULL,
    "extensionName" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Extension_pkey" PRIMARY KEY ("extensionId")
);

-- AddForeignKey
ALTER TABLE "ExtensionDefinition" ADD CONSTRAINT "ExtensionDefinition_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

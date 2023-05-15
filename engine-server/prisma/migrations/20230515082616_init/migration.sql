-- CreateEnum
CREATE TYPE "ExtensionType" AS ENUM ('GRAPHQL', 'REST', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ReleaseStage" AS ENUM ('ALPHA', 'BETA', 'GENERALLY_AVAILABLE', 'CUSTOM');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "workspaceId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "initialSetupComplete" BOOLEAN NOT NULL DEFAULT false,
    "anonymousDataCollection" BOOLEAN NOT NULL DEFAULT false,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspaceId")
);

-- CreateTable
CREATE TABLE "ExtensionDefinition" (
    "extensionDefinitionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "icon" TEXT,
    "source" TEXT NOT NULL,
    "releaseStage" "ReleaseStage" NOT NULL DEFAULT 'ALPHA',
    "extensionType" "ExtensionType" NOT NULL DEFAULT 'GRAPHQL',
    "workspaceId" TEXT,
    "schemaSource" TEXT,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtensionDefinition_pkey" PRIMARY KEY ("extensionDefinitionId")
);

-- CreateTable
CREATE TABLE "ExtensionAuth" (
    "extensionAuthId" TEXT NOT NULL,
    "extensionAuthName" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "scopes" TEXT NOT NULL,
    "workspaceId" TEXT,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtensionAuth_pkey" PRIMARY KEY ("extensionAuthId")
);

-- CreateTable
CREATE TABLE "ExtensionAccount" (
    "extensionAccountId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "extensionConfiguration" JSONB,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extensionAccountName" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtensionAccount_pkey" PRIMARY KEY ("extensionAccountId")
);

-- CreateTable
CREATE TABLE "Gateway" (
    "gatewayTokenId" TEXT NOT NULL,
    "hiveToken" TEXT NOT NULL,
    "workspaceId" TEXT,

    CONSTRAINT "Gateway_pkey" PRIMARY KEY ("gatewayTokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAuth_extensionAuthName_workspaceId_key" ON "ExtensionAuth"("extensionAuthName", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAccount_extensionAccountName_key" ON "ExtensionAccount"("extensionAccountName");

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAccount_extensionAccountName_workspaceId_key" ON "ExtensionAccount"("extensionAccountName", "workspaceId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionDefinition" ADD CONSTRAINT "ExtensionDefinition_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAuth" ADD CONSTRAINT "ExtensionAuth_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAuth" ADD CONSTRAINT "ExtensionAuth_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gateway" ADD CONSTRAINT "Gateway_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

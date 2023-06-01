-- CreateEnum
CREATE TYPE "ReleaseStage" AS ENUM ('ALPHA', 'BETA', 'GENERALLY_AVAILABLE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('HRIS', 'MESSAGING', 'CALENDAR');

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
CREATE TABLE "IntegrationDefinition" (
    "integrationDefinitionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "icon" TEXT,
    "releaseStage" "ReleaseStage" NOT NULL DEFAULT 'ALPHA',
    "integrationType" "IntegrationType" NOT NULL,
    "workspaceId" TEXT,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationDefinition_pkey" PRIMARY KEY ("integrationDefinitionId")
);

-- CreateTable
CREATE TABLE "IntegrationOAuthApp" (
    "integrationOAuthAppId" TEXT NOT NULL,
    "integrationOAuthAppName" TEXT NOT NULL,
    "integrationDefinitionId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "scopes" TEXT NOT NULL,
    "workspaceId" TEXT,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationOAuthApp_pkey" PRIMARY KEY ("integrationOAuthAppId")
);

-- CreateTable
CREATE TABLE "IntegrationAccount" (
    "integrationAccountId" TEXT NOT NULL,
    "integrationDefinitionId" TEXT NOT NULL,
    "integrationConfiguration" JSONB,
    "authType" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "integrationAccountName" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationAccount_pkey" PRIMARY KEY ("integrationAccountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationDefinition_integrationDefinitionId_key_key" ON "IntegrationDefinition"("integrationDefinitionId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationOAuthApp_integrationOAuthAppName_workspaceId_key" ON "IntegrationOAuthApp"("integrationOAuthAppName", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationAccount_integrationAccountName_workspaceId_key" ON "IntegrationAccount"("integrationAccountName", "workspaceId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationDefinition" ADD CONSTRAINT "IntegrationDefinition_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOAuthApp" ADD CONSTRAINT "IntegrationOAuthApp_integrationDefinitionId_fkey" FOREIGN KEY ("integrationDefinitionId") REFERENCES "IntegrationDefinition"("integrationDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationOAuthApp" ADD CONSTRAINT "IntegrationOAuthApp_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_integrationDefinitionId_fkey" FOREIGN KEY ("integrationDefinitionId") REFERENCES "IntegrationDefinition"("integrationDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE RESTRICT ON UPDATE CASCADE;

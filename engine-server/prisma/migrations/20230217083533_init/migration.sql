-- CreateEnum
CREATE TYPE "ExtensionType" AS ENUM ('GRAPHQL', 'OPENAPI', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ExtensionSchemaType" AS ENUM ('GRAPHQL', 'OPENAPI', 'CUSTOM');

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
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspaceId")
);

-- CreateTable
CREATE TABLE "ExtensionDefinition" (
    "extensionDefinitionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dockerImageTag" TEXT NOT NULL,
    "dockerRepository" TEXT NOT NULL,
    "icon" TEXT,
    "releaseStage" "ReleaseStage" NOT NULL DEFAULT 'ALPHA',
    "extensionType" "ExtensionType" NOT NULL DEFAULT 'GRAPHQL',
    "workspaceId" TEXT,
    "spec" JSONB NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "ExtensionDefinition_pkey" PRIMARY KEY ("extensionDefinitionId")
);

-- CreateTable
CREATE TABLE "ExtensionAccount" (
    "extensionAccountId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "extensionConfiguration" JSONB,
    "workspaceId" TEXT,
    "name" TEXT NOT NULL,
    "extensionAccountName" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "ExtensionAccount_pkey" PRIMARY KEY ("extensionAccountId")
);

-- CreateTable
CREATE TABLE "ExtensionRouter" (
    "extensionRouterId" TEXT NOT NULL,
    "extensionDefinitionId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "workspaceId" TEXT,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "ExtensionRouter_pkey" PRIMARY KEY ("extensionRouterId")
);

-- CreateTable
CREATE TABLE "ExtensionSchema" (
    "extensionSchemaId" TEXT NOT NULL,
    "type" "ExtensionSchemaType" NOT NULL,
    "schema" JSONB NOT NULL,
    "extensionAccountId" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "ExtensionSchema_pkey" PRIMARY KEY ("extensionSchemaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_userId_slug_key" ON "Workspace"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionAccount_extensionAccountName_key" ON "ExtensionAccount"("extensionAccountName");

-- CreateIndex
CREATE UNIQUE INDEX "ExtensionRouter_extensionDefinitionId_key" ON "ExtensionRouter"("extensionDefinitionId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionDefinition" ADD CONSTRAINT "ExtensionDefinition_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionAccount" ADD CONSTRAINT "ExtensionAccount_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionRouter" ADD CONSTRAINT "ExtensionRouter_extensionDefinitionId_fkey" FOREIGN KEY ("extensionDefinitionId") REFERENCES "ExtensionDefinition"("extensionDefinitionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionRouter" ADD CONSTRAINT "ExtensionRouter_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("workspaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtensionSchema" ADD CONSTRAINT "ExtensionSchema_extensionAccountId_fkey" FOREIGN KEY ("extensionAccountId") REFERENCES "ExtensionAccount"("extensionAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

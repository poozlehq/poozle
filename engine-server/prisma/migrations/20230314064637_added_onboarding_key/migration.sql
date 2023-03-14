-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "initialSetupComplete" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Gateway" (
    "gatewayTokenId" TEXT NOT NULL,
    "hiveToken" TEXT NOT NULL,

    CONSTRAINT "Gateway_pkey" PRIMARY KEY ("gatewayTokenId")
);

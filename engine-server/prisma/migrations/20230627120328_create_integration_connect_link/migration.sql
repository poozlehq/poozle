-- AlterTable
ALTER TABLE "IntegrationAccount" ADD COLUMN     "integrationConnectLinkIntegrationConnectionLinkId" TEXT;

-- CreateTable
CREATE TABLE "IntegrationConnectLink" (
    "integrationConnectionLinkId" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL DEFAULT 60,
    "category" "IntegrationType"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationConnectLink_pkey" PRIMARY KEY ("integrationConnectionLinkId")
);

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_integrationConnectLinkIntegrationConnec_fkey" FOREIGN KEY ("integrationConnectLinkIntegrationConnectionLinkId") REFERENCES "IntegrationConnectLink"("integrationConnectionLinkId") ON DELETE SET NULL ON UPDATE CASCADE;

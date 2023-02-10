-- CreateEnum
CREATE TYPE "ExtensionSchemaType" AS ENUM ('GRAPHQL', 'OPENAPI', 'CUSTOM');

-- AlterTable
ALTER TABLE "ExtensionAccount" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ExtensionDefinition" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ExtensionRouter" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ExtensionSpec" ADD COLUMN     "deleted" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "deleted" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "ExtensionSchema" (
    "extensionSchemaId" TEXT NOT NULL,
    "type" "ExtensionSchemaType" NOT NULL,
    "schema" JSONB NOT NULL,
    "extensionAccountId" TEXT NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "ExtensionSchema_pkey" PRIMARY KEY ("extensionSchemaId")
);

-- AddForeignKey
ALTER TABLE "ExtensionSchema" ADD CONSTRAINT "ExtensionSchema_extensionAccountId_fkey" FOREIGN KEY ("extensionAccountId") REFERENCES "ExtensionAccount"("extensionAccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

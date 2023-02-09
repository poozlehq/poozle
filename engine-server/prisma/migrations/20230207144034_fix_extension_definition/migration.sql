/*
  Warnings:

  - The values [REST] on the enum `ExtensionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `functionEnv` on the `ExtensionDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `functionUrl` on the `ExtensionDefinition` table. All the data in the column will be lost.
  - Added the required column `dockerImageTag` to the `ExtensionDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dockerRepository` to the `ExtensionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExtensionType_new" AS ENUM ('GRAPHQL', 'OPENAPI', 'CUSTOM');
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" DROP DEFAULT;
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" TYPE "ExtensionType_new" USING ("extensionType"::text::"ExtensionType_new");
ALTER TYPE "ExtensionType" RENAME TO "ExtensionType_old";
ALTER TYPE "ExtensionType_new" RENAME TO "ExtensionType";
DROP TYPE "ExtensionType_old";
ALTER TABLE "ExtensionDefinition" ALTER COLUMN "extensionType" SET DEFAULT 'GRAPHQL';
COMMIT;

-- AlterTable
ALTER TABLE "ExtensionDefinition" DROP COLUMN "functionEnv",
DROP COLUMN "functionUrl",
ADD COLUMN     "dockerImageTag" TEXT NOT NULL,
ADD COLUMN     "dockerRepository" TEXT NOT NULL;

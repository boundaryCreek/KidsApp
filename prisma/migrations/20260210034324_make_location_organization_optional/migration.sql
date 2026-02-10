-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_organizationId_fkey";

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "organizationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

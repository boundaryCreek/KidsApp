/*
  Warnings:

  - You are about to drop the column `email` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "timezone" TEXT DEFAULT 'America/Chicago';

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "email",
DROP COLUMN "phone";

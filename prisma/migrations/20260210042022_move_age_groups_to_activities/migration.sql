/*
  Warnings:

  - You are about to drop the column `ageGroupId` on the `activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_ageGroupId_fkey";

-- DropIndex
DROP INDEX "activities_ageGroupId_idx";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "ageGroupId";

-- CreateTable
CREATE TABLE "_ActivityAgeGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityAgeGroup_AB_unique" ON "_ActivityAgeGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityAgeGroup_B_index" ON "_ActivityAgeGroup"("B");

-- AddForeignKey
ALTER TABLE "_ActivityAgeGroup" ADD CONSTRAINT "_ActivityAgeGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityAgeGroup" ADD CONSTRAINT "_ActivityAgeGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "age_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "CostRange" AS ENUM ('FREE', 'BUDGET', 'MODERATE', 'EXPENSIVE');

-- AlterTable
ALTER TABLE "locations" ADD COLUMN     "costRange" "CostRange";

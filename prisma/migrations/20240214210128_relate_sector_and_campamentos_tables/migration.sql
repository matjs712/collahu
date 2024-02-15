/*
  Warnings:

  - Added the required column `sectorId` to the `Wing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wing" ADD COLUMN     "sectorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Wing" ADD CONSTRAINT "Wing_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Espacio" ADD COLUMN     "piso" TEXT,
ADD COLUMN     "sectorId" TEXT;

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

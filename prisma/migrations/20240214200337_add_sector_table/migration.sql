-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "campamentoId" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_campamentoId_fkey" FOREIGN KEY ("campamentoId") REFERENCES "Campamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

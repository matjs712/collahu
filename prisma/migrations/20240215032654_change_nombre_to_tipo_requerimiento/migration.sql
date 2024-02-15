/*
  Warnings:

  - You are about to drop the column `nombre` on the `Motivos` table. All the data in the column will be lost.
  - Added the required column `tipo_requerimiento` to the `Motivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motivos" DROP COLUMN "nombre",
ADD COLUMN     "tipo_requerimiento" TEXT NOT NULL,
ALTER COLUMN "descripcion" DROP NOT NULL,
ALTER COLUMN "prioridad" SET DATA TYPE TEXT;

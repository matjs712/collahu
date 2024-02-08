/*
  Warnings:

  - You are about to drop the column `userId` on the `Habitacion` table. All the data in the column will be lost.
  - You are about to drop the `HabitacionUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitacionUser" DROP CONSTRAINT "HabitacionUser_habitacionId_fkey";

-- DropForeignKey
ALTER TABLE "HabitacionUser" DROP CONSTRAINT "HabitacionUser_userId_fkey";

-- AlterTable
ALTER TABLE "Habitacion" DROP COLUMN "userId",
ADD COLUMN     "tipo_banio" TEXT,
ADD COLUMN     "tipo_cargos" TEXT,
ADD COLUMN     "tipo_turnos" TEXT,
ALTER COLUMN "numero" DROP NOT NULL,
ALTER COLUMN "tipo_huesped" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "HabitacionUser";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rut" TEXT,
    "telefono" TEXT,
    "cargo" TEXT,
    "rol" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campamento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "img" TEXT,

    CONSTRAINT "Campamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wing" (
    "id" TEXT NOT NULL,
    "campamentoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "n_habitaciones" INTEGER,

    CONSTRAINT "Wing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" TEXT NOT NULL,
    "campamentoId" TEXT NOT NULL,
    "wingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "descripcion" TEXT,
    "n_camas" INTEGER,
    "tipo_huesped" INTEGER,

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitacionUser" (
    "id" TEXT NOT NULL,
    "habitacionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HabitacionUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Espacio" (
    "id" TEXT NOT NULL,
    "campamentoId" TEXT NOT NULL,
    "wingId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Espacio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motivos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "prioridad" INTEGER NOT NULL,

    CONSTRAINT "Motivos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HabitacionUser_habitacionId_userId_key" ON "HabitacionUser"("habitacionId", "userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wing" ADD CONSTRAINT "Wing_campamentoId_fkey" FOREIGN KEY ("campamentoId") REFERENCES "Campamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habitacion" ADD CONSTRAINT "Habitacion_campamentoId_fkey" FOREIGN KEY ("campamentoId") REFERENCES "Campamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habitacion" ADD CONSTRAINT "Habitacion_wingId_fkey" FOREIGN KEY ("wingId") REFERENCES "Wing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitacionUser" ADD CONSTRAINT "HabitacionUser_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "Habitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitacionUser" ADD CONSTRAINT "HabitacionUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_campamentoId_fkey" FOREIGN KEY ("campamentoId") REFERENCES "Campamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Espacio" ADD CONSTRAINT "Espacio_wingId_fkey" FOREIGN KEY ("wingId") REFERENCES "Wing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

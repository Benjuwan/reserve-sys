-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "todoID" TEXT NOT NULL,
    "todoContent" TEXT NOT NULL,
    "edit" BOOLEAN NOT NULL DEFAULT false,
    "pw" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "finishTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

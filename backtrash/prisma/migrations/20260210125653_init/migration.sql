-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'VERIFIED', 'CLEANED', 'SPAM');

-- CreateTable
CREATE TABLE "TrashReport" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "description" VARCHAR(280),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "ipHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrashReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrashReport_ipHash_idx" ON "TrashReport"("ipHash");

-- CreateIndex
CREATE INDEX "TrashReport_latitude_longitude_idx" ON "TrashReport"("latitude", "longitude");

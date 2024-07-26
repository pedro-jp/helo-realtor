/*
  Warnings:

  - You are about to drop the `offices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "office_banners" DROP CONSTRAINT "office_banners_officeId_fkey";

-- DropForeignKey
ALTER TABLE "offices" DROP CONSTRAINT "offices_ownerId_fkey";

-- DropTable
DROP TABLE "offices";

-- CreateTable
CREATE TABLE "office" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "office_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "office_id_key" ON "office"("id");

-- CreateIndex
CREATE UNIQUE INDEX "office_ownerId_key" ON "office"("ownerId");

-- AddForeignKey
ALTER TABLE "office" ADD CONSTRAINT "office_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "office_banners" ADD CONSTRAINT "office_banners_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

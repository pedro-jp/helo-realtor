/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `office` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "office_ownerId_key" ON "office"("ownerId");

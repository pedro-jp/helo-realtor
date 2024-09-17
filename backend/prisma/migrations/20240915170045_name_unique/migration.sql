/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `office` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "office_name_key" ON "office"("name");

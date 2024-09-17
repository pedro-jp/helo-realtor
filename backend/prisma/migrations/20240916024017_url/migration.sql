/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `office` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `office` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "office" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "office_url_key" ON "office"("url");

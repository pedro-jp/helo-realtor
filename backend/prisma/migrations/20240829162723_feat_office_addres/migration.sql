/*
  Warnings:

  - You are about to drop the column `location` on the `office` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "office" DROP COLUMN "location",
ADD COLUMN     "addres" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "addres_city" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "addres_state" TEXT NOT NULL DEFAULT ' ';

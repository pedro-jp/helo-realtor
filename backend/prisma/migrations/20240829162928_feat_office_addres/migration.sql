/*
  Warnings:

  - You are about to drop the column `addres` on the `office` table. All the data in the column will be lost.
  - You are about to drop the column `addres_city` on the `office` table. All the data in the column will be lost.
  - You are about to drop the column `addres_state` on the `office` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "office" DROP COLUMN "addres",
DROP COLUMN "addres_city",
DROP COLUMN "addres_state",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "address_city" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "address_state" TEXT NOT NULL DEFAULT ' ';

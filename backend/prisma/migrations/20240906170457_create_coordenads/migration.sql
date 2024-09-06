/*
  Warnings:

  - You are about to drop the column `coordenads` on the `imoveis` table. All the data in the column will be lost.
  - You are about to drop the column `coordenads` on the `office` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "imoveis" DROP COLUMN "coordenads",
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT ' ';

-- AlterTable
ALTER TABLE "office" DROP COLUMN "coordenads",
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT ' ',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT ' ';

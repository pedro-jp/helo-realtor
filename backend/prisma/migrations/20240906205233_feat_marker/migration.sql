/*
  Warnings:

  - You are about to drop the column `marker` on the `office` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN     "marker" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "office" DROP COLUMN "marker";

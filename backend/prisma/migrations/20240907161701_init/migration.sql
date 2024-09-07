/*
  Warnings:

  - You are about to drop the column `quantidade` on the `favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "quantidade",
ADD COLUMN     "ip" TEXT NOT NULL DEFAULT '';

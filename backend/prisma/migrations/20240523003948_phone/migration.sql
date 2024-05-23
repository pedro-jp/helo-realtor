/*
  Warnings:

  - You are about to drop the column `active` on the `offices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offices" DROP COLUMN "active",
ALTER COLUMN "phones" SET NOT NULL,
ALTER COLUMN "phones" SET DATA TYPE TEXT;

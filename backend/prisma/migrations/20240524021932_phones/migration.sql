/*
  Warnings:

  - You are about to drop the column `phone` on the `offices` table. All the data in the column will be lost.
  - Added the required column `phones` to the `offices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offices" DROP COLUMN "phone",
ADD COLUMN     "phones" TEXT NOT NULL;

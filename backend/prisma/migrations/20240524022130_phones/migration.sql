/*
  Warnings:

  - You are about to drop the column `phones` on the `offices` table. All the data in the column will be lost.
  - Added the required column `phone` to the `offices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offices" DROP COLUMN "phones",
ADD COLUMN     "phone" TEXT NOT NULL;

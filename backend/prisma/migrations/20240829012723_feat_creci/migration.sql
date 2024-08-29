/*
  Warnings:

  - Added the required column `creci` to the `realtors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "realtors" ADD COLUMN     "creci" TEXT NOT NULL;

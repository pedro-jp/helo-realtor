/*
  Warnings:

  - Added the required column `email` to the `office` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "office" ADD COLUMN     "email" TEXT NOT NULL;

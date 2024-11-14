/*
  Warnings:

  - Added the required column `name` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "name" TEXT NOT NULL;

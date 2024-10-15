/*
  Warnings:

  - Added the required column `wahtsapp_Message` to the `realtors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "realtors" ADD COLUMN     "wahtsapp_Message" TEXT NOT NULL;

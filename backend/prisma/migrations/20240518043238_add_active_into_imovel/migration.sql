/*
  Warnings:

  - Added the required column `active` to the `imoveis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN     "active" BOOLEAN NOT NULL;

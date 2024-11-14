/*
  Warnings:

  - You are about to drop the column `realtorId` on the `subscriptions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_officeId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_realtorId_fkey";

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "realtorId";

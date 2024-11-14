-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_realtorId_fkey";

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "realtorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

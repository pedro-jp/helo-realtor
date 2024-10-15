-- AlterTable
ALTER TABLE "users" ADD COLUMN     "subscriptionId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "subscription_type" TEXT NOT NULL DEFAULT '';

/*
  Warnings:

  - A unique constraint covering the columns `[officeId]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "subscriptions_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_officeId_key" ON "subscriptions"("officeId");

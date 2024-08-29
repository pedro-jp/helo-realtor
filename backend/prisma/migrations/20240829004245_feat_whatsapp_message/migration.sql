/*
  Warnings:

  - You are about to drop the column `wahtsapp_Message` on the `realtors` table. All the data in the column will be lost.
  - Added the required column `whatsapp_message` to the `realtors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "realtors" DROP COLUMN "wahtsapp_Message",
ADD COLUMN     "whatsapp_message" TEXT NOT NULL;

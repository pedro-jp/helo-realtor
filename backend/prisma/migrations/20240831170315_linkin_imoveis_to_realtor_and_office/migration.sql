/*
  Warnings:

  - Added the required column `officeId` to the `imoveis` table without a default value. This is not possible if the table is not empty.
  - Made the column `realtorId` on table `imoveis` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "imoveis" DROP CONSTRAINT "imoveis_realtorId_fkey";

-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN     "officeId" TEXT NOT NULL,
ALTER COLUMN "realtorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

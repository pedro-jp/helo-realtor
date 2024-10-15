/*
  Warnings:

  - You are about to drop the column `images` on the `imoveis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "imoveis" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "imoveis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

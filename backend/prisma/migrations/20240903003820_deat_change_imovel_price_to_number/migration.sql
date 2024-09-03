/*
  Warnings:

  - Changed the type of `price` on the `imoveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "imoveis" DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

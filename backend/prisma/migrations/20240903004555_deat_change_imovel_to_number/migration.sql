/*
  Warnings:

  - Changed the type of `area` on the `imoveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `banheiros` on the `imoveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `garagem` on the `imoveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quartos` on the `imoveis` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "imoveis" DROP COLUMN "area",
ADD COLUMN     "area" INTEGER NOT NULL,
DROP COLUMN "banheiros",
ADD COLUMN     "banheiros" INTEGER NOT NULL,
DROP COLUMN "garagem",
ADD COLUMN     "garagem" INTEGER NOT NULL,
DROP COLUMN "quartos",
ADD COLUMN     "quartos" INTEGER NOT NULL;

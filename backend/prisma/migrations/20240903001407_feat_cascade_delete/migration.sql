-- DropForeignKey
ALTER TABLE "imoveis" DROP CONSTRAINT "imoveis_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "imoveis" DROP CONSTRAINT "imoveis_officeId_fkey";

-- DropForeignKey
ALTER TABLE "imoveis" DROP CONSTRAINT "imoveis_realtorId_fkey";

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE CASCADE ON UPDATE CASCADE;

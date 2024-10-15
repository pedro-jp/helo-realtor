-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_imovelId_fkey";

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "imoveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

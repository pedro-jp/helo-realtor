/*
  Warnings:

  - You are about to drop the `favoritos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favoritos" DROP CONSTRAINT "favoritos_imovelId_fkey";

-- DropTable
DROP TABLE "favoritos";

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorites_id_key" ON "favorites"("id");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "imoveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

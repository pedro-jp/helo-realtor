-- CreateTable
CREATE TABLE "favoritos" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favoritos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favoritos_id_key" ON "favoritos"("id");

-- AddForeignKey
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "imoveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

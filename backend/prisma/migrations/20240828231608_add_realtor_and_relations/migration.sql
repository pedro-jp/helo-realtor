-- DropIndex
DROP INDEX "office_ownerId_key";

-- AlterTable
ALTER TABLE "imoveis" ADD COLUMN     "realtorId" TEXT;

-- CreateTable
CREATE TABLE "realtors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "realtors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "realtors_id_key" ON "realtors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "realtors_email_key" ON "realtors"("email");

-- AddForeignKey
ALTER TABLE "realtors" ADD CONSTRAINT "realtors_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES "realtors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "office_logos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,

    CONSTRAINT "office_logos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "office_logos_id_key" ON "office_logos"("id");

-- AddForeignKey
ALTER TABLE "office_logos" ADD CONSTRAINT "office_logos_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

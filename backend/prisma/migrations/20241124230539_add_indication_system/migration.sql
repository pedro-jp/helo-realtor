-- CreateTable
CREATE TABLE "indications" (
    "id" TEXT NOT NULL,
    "indicatedById" TEXT NOT NULL,
    "indicatedToId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "indications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "indications_id_key" ON "indications"("id");

-- AddForeignKey
ALTER TABLE "indications" ADD CONSTRAINT "indications_indicatedById_fkey" FOREIGN KEY ("indicatedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indications" ADD CONSTRAINT "indications_indicatedToId_fkey" FOREIGN KEY ("indicatedToId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

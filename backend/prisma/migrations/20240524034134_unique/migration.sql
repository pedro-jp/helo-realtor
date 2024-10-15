/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `imoveis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `office_banners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `offices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user_photos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_id_key" ON "categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_id_key" ON "images"("id");

-- CreateIndex
CREATE UNIQUE INDEX "imoveis_id_key" ON "imoveis"("id");

-- CreateIndex
CREATE UNIQUE INDEX "office_banners_id_key" ON "office_banners"("id");

-- CreateIndex
CREATE UNIQUE INDEX "offices_id_key" ON "offices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_photos_id_key" ON "user_photos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

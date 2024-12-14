/*
  Warnings:

  - A unique constraint covering the columns `[publicKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,username,publicKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_id_username_idx";

-- DropIndex
DROP INDEX "User_id_username_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- CreateIndex
CREATE INDEX "User_id_username_publicKey_idx" ON "User"("id", "username", "publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_publicKey_key" ON "User"("id", "username", "publicKey");

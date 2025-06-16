/*
  Warnings:

  - A unique constraint covering the columns `[chat_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "chat_id" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "User_chat_id_key" ON "User"("chat_id");

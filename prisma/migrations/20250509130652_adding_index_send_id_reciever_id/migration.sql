/*
  Warnings:

  - A unique constraint covering the columns `[senderId,receiverId]` on the table `friend` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `friend_senderId_receiverId_key` ON `friend`(`senderId`, `receiverId`);

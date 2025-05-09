-- DropIndex
DROP INDEX `User_email_idx` ON `user`;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NOT NULL,
    `reciverId` INTEGER NOT NULL,

    UNIQUE INDEX `message_senderId_reciverId_key`(`senderId`, `reciverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `User_email_id_idx` ON `User`(`email`, `id`);

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_reciverId_fkey` FOREIGN KEY (`reciverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

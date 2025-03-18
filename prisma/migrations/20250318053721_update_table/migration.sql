/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    MODIFY `role` INTEGER NOT NULL DEFAULT 1,
    MODIFY `state` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `UserEncrypt` (
    `userId` INTEGER NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `salt` VARCHAR(100) NOT NULL,
    `iteration` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserEncrypt` ADD CONSTRAINT `UserEncrypt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

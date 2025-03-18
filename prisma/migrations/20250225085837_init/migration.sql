-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(70) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(150) NOT NULL,
    `is_email_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `role` INTEGER NOT NULL DEFAULT 1,
    `state` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `last_login` DATETIME(3) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `buffer` MEDIUMBLOB NOT NULL,
    `mime_type` VARCHAR(20) NOT NULL,
    `size` INTEGER NOT NULL,
    `origin_name` VARCHAR(50) NOT NULL,
    `filename` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profile_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profile` ADD CONSTRAINT `profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

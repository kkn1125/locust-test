-- AlterTable
ALTER TABLE `user` MODIFY `role` INTEGER NOT NULL DEFAULT 1,
    MODIFY `state` INTEGER NOT NULL DEFAULT 1;

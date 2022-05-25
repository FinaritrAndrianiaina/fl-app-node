/*
  Warnings:

  - Added the required column `task` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userSub` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` CHANGE `tasks` `task` VARCHAR(191),
    ADD COLUMN `userSub` VARCHAR(191);

UPDATE `todo` SET `userSub` = 'google-oauth2|110374894591726267232';

ALTER TABLE `todo` CHANGE `userSub` `userSub` VARCHAR(191) NOT NULL;


-- CreateTable
CREATE TABLE `User` (
    `sub` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `email_verified` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_sub_key`(`sub`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`sub`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userSub_fkey` FOREIGN KEY (`userSub`) REFERENCES `User`(`sub`) ON DELETE RESTRICT ON UPDATE CASCADE;


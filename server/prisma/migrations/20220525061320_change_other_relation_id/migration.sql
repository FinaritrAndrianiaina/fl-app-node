/*
  Warnings:

  - You are about to drop the column `userSub` on the `todo` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_userSub_fkey`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `userSub`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

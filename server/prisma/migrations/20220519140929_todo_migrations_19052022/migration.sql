-- CreateTable
CREATE TABLE `Todo` (
    `id` VARCHAR(191) NOT NULL,
    `isDone` BOOLEAN NULL DEFAULT false,
    `tasks` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Todo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

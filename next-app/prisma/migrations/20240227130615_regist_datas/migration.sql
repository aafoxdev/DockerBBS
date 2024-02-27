-- CreateTable
CREATE TABLE `RegistDatas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `cookdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `foodmemo` VARCHAR(191) NOT NULL,
    `afterlog` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

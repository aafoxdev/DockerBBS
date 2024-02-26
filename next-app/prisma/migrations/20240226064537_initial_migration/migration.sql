-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` VARCHAR(191) NOT NULL,
    `categoryName` VARCHAR(191) NOT NULL,
    `categoryUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RecipeCategory_categoryId_key`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

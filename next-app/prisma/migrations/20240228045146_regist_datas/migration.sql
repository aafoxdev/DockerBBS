/*
  Warnings:

  - Added the required column `foodImageUrl` to the `RegistDatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RegistDatas` ADD COLUMN `foodImageUrl` VARCHAR(191) NOT NULL;

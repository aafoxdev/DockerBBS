/*
  Warnings:

  - You are about to drop the column `name` on the `RegistDatas` table. All the data in the column will be lost.
  - Added the required column `recipeTitle` to the `RegistDatas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RegistDatas` DROP COLUMN `name`,
    ADD COLUMN `recipeTitle` VARCHAR(191) NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[recipeTitle]` on the table `RegistDatas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RegistDatas_recipeTitle_key` ON `RegistDatas`(`recipeTitle`);

/*
  Warnings:

  - You are about to drop the column `nama` on the `Role` table. All the data in the column will be lost.
  - Added the required column `name` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Role` DROP COLUMN `nama`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

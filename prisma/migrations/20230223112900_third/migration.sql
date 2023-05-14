/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_roleId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `roleId`;

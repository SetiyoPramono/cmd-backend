/*
  Warnings:

  - You are about to drop the column `image` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `image`,
    ADD COLUMN `imageId` VARCHAR(191) NULL,
    ADD COLUMN `imagerUrl` VARCHAR(191) NULL;

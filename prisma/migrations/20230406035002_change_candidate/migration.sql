/*
  Warnings:

  - You are about to drop the column `imagerUrl` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `imagerUrl`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

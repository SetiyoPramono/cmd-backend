/*
  Warnings:

  - Added the required column `cityId` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Candidate` ADD COLUMN `cityId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

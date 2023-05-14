/*
  Warnings:

  - You are about to drop the column `cityId` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Candidate` DROP FOREIGN KEY `Candidate_cityId_fkey`;

-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `cityId`;

-- CreateTable
CREATE TABLE `_CandidateToCity` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CandidateToCity_AB_unique`(`A`, `B`),
    INDEX `_CandidateToCity_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CandidateToCity` ADD CONSTRAINT `_CandidateToCity_A_fkey` FOREIGN KEY (`A`) REFERENCES `Candidate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CandidateToCity` ADD CONSTRAINT `_CandidateToCity_B_fkey` FOREIGN KEY (`B`) REFERENCES `City`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[provinceId]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cityId]` on the table `Subdistrict` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subdistrictId]` on the table `Village` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `City_provinceId_key` ON `City`(`provinceId`);

-- CreateIndex
CREATE UNIQUE INDEX `Subdistrict_cityId_key` ON `Subdistrict`(`cityId`);

-- CreateIndex
CREATE UNIQUE INDEX `Village_subdistrictId_key` ON `Village`(`subdistrictId`);

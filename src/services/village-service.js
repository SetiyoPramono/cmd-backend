const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class VillageService {
  constructor() {
    this.prisma = new PrismaClient().village;
  }

  async CreateVillage(villageInputs) {
    const { name, subdistrictId } = villageInputs;

    try {
      const village = await this.prisma.create({
        data: {
          name,
          subdistrictId,
        },
      });
      return FormateData({ village });
    } catch (error) {
      throw new APIError("Create village Failed");
    }
  }

  async GetVillage() {
    try {
      const village = await this.prisma.findMany({
        include: { subdistrict: true },
      });
      return FormateData({ village });
    } catch (error) {
      throw new APIError("Get village Failed");
    }
  }

  async GetVillageById(villageId) {
    try {
      const village = await this.prisma.findUnique({
        where: {
          id: villageId,
        },
      });
      return FormateData({ village });
    } catch (error) {
      throw new APIError("Get village Failed");
    }
  }

  async GetVillageBySubdistrictId(subdistrictId) {
    try {
      const village = await this.prisma.findMany({
        where: {
          subdistrictId,
        },
      });
      return FormateData({ village });
    } catch (error) {
      throw new APIError("Get village Failed");
    }
  }

  async UpdateVillage(villageInputs) {
    const { name, villageId, subdistrictId } = villageInputs;
    try {
      const village = await this.prisma.update({
        where: {
          id: villageId,
        },
        data: {
          name,
          subdistrictId,
        },
      });

      return FormateData({ village });
    } catch (error) {
      throw new APIError("Failed Update village");
    }
  }

  async DeleteVillage(villageId) {
    try {
      const village = await this.prisma.delete({
        where: {
          id: villageId,
        },
      });
      return FormateData({ village });
    } catch (error) {
      throw new APIError("Failed Delete village");
    }
  }
}

module.exports = VillageService;

const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class ProvinceService {
  constructor() {
    this.prisma = new PrismaClient().province;
  }

  async CreateProvince(provinceInputs) {
    const { name } = provinceInputs;

    try {
      const province = await this.prisma.create({
        data: {
          name: name,
        },
      });
      return FormateData({ province });
    } catch (error) {
      throw new APIError("Create Profince Failed");
    }
  }

  async GetProvince() {
    try {
      const province = await this.prisma.findMany();
      return FormateData({ province });
    } catch (error) {
      throw new APIError("Get Province Failed");
    }
  }

  async GetProvinceById(provinceId) {
    try {
      const province = await this.prisma.findUnique({
        where: {
          id: provinceId,
        },
      });
      return FormateData({ province });
    } catch (error) {
      throw new APIError("Get Province Failed");
    }
  }

  async UpdateProvince(provinceInputs) {
    const { name, provinceId } = provinceInputs;
    try {
      const province = await this.prisma.update({
        where: {
          id: provinceId,
        },
        data: {
          name,
        },
      });

      return FormateData({ province });
    } catch (error) {
      throw new APIError("Failed Update Province");
    }
  }

  async DeleteProvince(provinceId) {
    try {
      const province = await this.prisma.delete({
        where: {
          id: provinceId,
        },
      });
      return FormateData({ province });
    } catch (error) {
      throw new APIError("Failed Delete Province");
    }
  }
}

module.exports = ProvinceService;

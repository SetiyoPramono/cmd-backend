const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class SubdistrictService {
  constructor() {
    this.prisma = new PrismaClient().subdistrict;
  }

  async CreateSubdistrict(subdistrictInputs) {
    const { name, cityId } = subdistrictInputs;

    try {
      const subdistrict = await this.prisma.create({
        data: {
          name,
          cityId,
        },
      });
      return FormateData({ subdistrict });
    } catch (error) {
      throw new APIError("Create subdistrict Failed");
    }
  }

  async GetSubdistrict() {
    try {
      const subdistrict = await this.prisma.findMany({
        include: { city: true },
      });
      return FormateData({ subdistrict });
    } catch (error) {
      throw new APIError("Get subdistrict Failed");
    }
  }

  async GetSubdistrictById(subdistrictId) {
    try {
      const subdistrict = await this.prisma.findUnique({
        where: {
          id: subdistrictId,
        },
      });
      return FormateData({ subdistrict });
    } catch (error) {
      throw new APIError("Get subdistrict Failed");
    }
  }

  async GetSubdistrictByCityId(cityId) {
    try {
      const subdistrict = await this.prisma.findMany({
        where: {
          cityId,
        },
      });
      return FormateData({ subdistrict });
    } catch (error) {
      throw new APIError("Get subdistrict Failed");
    }
  }

  async UpdateSubdistrict(subdistrictInputs) {
    const { name, subdistrictId, cityId } = subdistrictInputs;
    try {
      const subdistrict = await this.prisma.update({
        where: {
          id: subdistrictId,
        },
        data: {
          name,
          cityId,
        },
      });

      return FormateData({ subdistrict });
    } catch (error) {
      throw new APIError("Failed Update subdistrict");
    }
  }

  async DeleteSubdistrict(subdistrictId) {
    try {
      const subdistrict = await this.prisma.delete({
        where: {
          id: subdistrictId,
        },
      });
      return FormateData({ subdistrict });
    } catch (error) {
      throw new APIError("Failed Delete subdistrict");
    }
  }
}

module.exports = SubdistrictService;

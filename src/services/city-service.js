const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class CityService {
  constructor() {
    this.prisma = new PrismaClient().city;
  }

  async CreateCity(cityInputs) {
    const { name, provinceId } = cityInputs;

    try {
      const city = await this.prisma.create({
        data: {
          name,
          provinceId,
        },
      });
      return FormateData({ city });
    } catch (error) {
      throw new APIError("Create City Failed");
    }
  }

  async GetCity() {
    try {
      const city = await this.prisma.findMany({
        include: { province: true },
      });
      return FormateData({ city });
    } catch (error) {
      throw new APIError("Get city Failed");
    }
  }

  async GetCityById(cityId) {
    try {
      const city = await this.prisma.findUnique({
        where: {
          id: cityId,
        },
      });
      return FormateData({ city });
    } catch (error) {
      throw new APIError("Get city Failed");
    }
  }

  async GetCityByProvinceId(provinceId) {
    try {
      const city = await this.prisma.findMany({ where: { provinceId } });
      return FormateData({ city });
    } catch (error) {
      console.log(error);
      throw new APIError("Get city Failed");
    }
  }

  async UpdateCity(cityInputs) {
    const { name, cityId, provinceId } = cityInputs;
    try {
      const city = await this.prisma.update({
        where: {
          id: cityId,
        },
        data: {
          name,
          provinceId,
        },
      });

      return FormateData({ city });
    } catch (error) {
      throw new APIError("Failed Update city");
    }
  }

  async DeleteCity(cityId) {
    try {
      const city = await this.prisma.delete({
        where: {
          id: cityId,
        },
      });
      return FormateData({ city });
    } catch (error) {
      throw new APIError("Failed Delete city");
    }
  }
}

module.exports = CityService;

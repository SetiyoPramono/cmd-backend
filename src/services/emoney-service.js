const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class EmoneyService {
  constructor() {
    this.prisma = new PrismaClient().emoney;
  }

  async CreateEmoney(emoneyInputs) {
    try {
      const emoney = await this.prisma.create({ data: { name: emoneyInputs } });
      return FormateData({ emoney });
    } catch (error) {
      throw new APIError("Create Emoney Failed", error);
    }
  }

  async GetAllEmoney() {
    try {
      const listEmoney = await this.prisma.findMany();
      return FormateData({ listEmoney });
    } catch (error) {
      throw new APIError("Get Emoney Failed", error);
    }
  }

  async GetEmoneyById(emoneyId) {
    try {
      const emoney = await this.prisma.findUnique({ where: { id: emoneyId } });
      return FormateData({ emoney });
    } catch (error) {
      throw new APIError("Get Emoney Failed", error);
    }
  }

  async UpdateEmoney(emoneyInputs) {
    const { emoneyId, name } = emoneyInputs;
    try {
      const emoney = await this.prisma.update({
        where: { id: emoneyId },
        data: { name },
      });
      return FormateData({ emoney });
    } catch (error) {
      throw new APIError("Update Emoney Failed", error);
    }
  }

  async DeleteEmoney(emoneyId) {
    try {
      const emoney = await this.prisma.delete({ where: { id: emoneyId } });
      return FormateData({ emoney });
    } catch (error) {
      throw new APIError("Delete Emoney Failed", error);
    }
  }
}

module.exports = EmoneyService;

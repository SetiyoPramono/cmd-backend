const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class DashboardService {
  constructor() {
    this.voter = new PrismaClient().voter;
  }

  async GetVoterAmount() {
    try {
      const voter = await this.voter.count();
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Get voter Failed");
    }
  }

  async GetVoterScannedAmount() {
    try {
      const voter = await this.voter.count({ where: { status: true } });
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Get voter Failed");
    }
  }
}

module.exports = DashboardService;

const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");

class VoterService {
  constructor() {
    this.prisma = new PrismaClient().voter;
  }

  async CreateVoter(voterInputs) {
    const {
      name,
      phoneNumber,
      provinceId,
      cityId,
      subdistrictId,
      villageId,
      address,
      candidateId,
      emoneyId,
    } = voterInputs;
    try {
      const voter = await this.prisma.create({
        data: {
          name,
          phoneNumber,
          provinceId,
          cityId,
          subdistrictId,
          villageId,
          address,
          status: false,
          candidateId,
          emoneyId,
        },
      });

      return FormateData({ voterId: voter.id });
    } catch (error) {
      console.log(error);
      throw new APIError("Create Voter Failed");
    }
  }

  async GetVoters() {
    try {
      const voter = await this.prisma.findMany({
        include: {
          candidate: true,
          city: true,
          eMoney: true,
          province: true,
          subdistrict: true,
          village: true,
        },
      });
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Get Voter Failed");
    }
  }

  async GetVoterById(voterId) {
    try {
      const voter = await this.prisma.findUnique({
        where: { id: voterId },
        select: {
          id: true,
          name: true,
        },
      });
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Get Voter Failed");
    }
  }

  async UpdateVoter(voterInputs) {
    const {
      voterId,
      name,
      phoneNumber,
      province,
      city,
      subdistrict,
      village,
      address,
      status,
      candidateId,
      emoneyId,
    } = voterInputs;

    try {
      const voter = await this.prisma.update({
        where: { id: voterId },
        data: {
          name,
          phoneNumber,
          province,
          city,
          subdistrict,
          village,
          address,
          status,
          candidateId,
          emoneyId,
        },
      });
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Update Voter Failed");
    }
  }

  async ScanVoter(voterId) {
    try {
      const voter = await this.prisma.update({
        where: { id: voterId },
        data: {
          status: true,
        },
      });
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Scan Failed");
    }
  }

  async DeleteVoter(voterId) {
    try {
      const voter = await this.prisma.delete({
        where: {
          id: voterId,
        },
      });
      return FormateData({ voter });
    } catch (error) {
      throw new APIError("Delete Voter Failed");
    }
  }
}

module.exports = VoterService;

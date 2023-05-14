const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");
const { DeleteImage, UploadImage } = require("../utils/upload-image");

class CandidateService {
  constructor() {
    this.prisma = new PrismaClient().candidate;
  }

  async CreateCandidate(candidateInputs) {
    const { name, image, number, dapil } = candidateInputs;

    try {
      const { imageId, imageUrl } = await UploadImage(image);
      const candidate = await this.prisma.create({
        data: {
          name,
          imageId: imageId,
          imageUrl: imageUrl,
          number,
          dapil: { connect: dapil },
        },
      });
      return FormateData({ candidate });
    } catch (error) {
      throw new APIError("Create Candidate Failed");
    }
  }

  async GetCandidate() {
    try {
      const candidate = await this.prisma.findMany({
        include: { dapil: true },
      });
      return FormateData({ candidate });
    } catch (error) {
      throw new APIError("Get Candidate Failed");
    }
  }

  async GetCandidateById(candidateId) {
    try {
      const candidate = await this.prisma.findUnique({
        where: { id: candidateId },
      });
      return FormateData({ candidate });
    } catch (error) {
      throw new APIError("Get Candidate Failed");
    }
  }

  async GetCandidateBydapil(dapil) {
    try {
      const candidate = await this.prisma.findMany({
        where: { dapil },
      });
      return FormateData({ candidate });
    } catch (error) {
      throw new APIError("Get Candidate Failed");
    }
  }

  async UpdateCandidate(candidateInputs) {
    const { candidateId, name, image, number, dapil } = candidateInputs;
    console.log({ image });

    try {
      const findCandidate = await this.prisma.findUnique({
        where: { id: candidateId },
      });
      if (image) {
        console.log("pake image");
        await DeleteImage(findCandidate.image);
        const { imageId, imageUrl } = await UploadImage(image);
        const candidate = await this.prisma.update({
          where: { id: candidateId },
          data: {
            name,
            imageId: imageId,
            imageUrl: imageUrl,
            number,
            dapil: { set: dapil },
          },
        });
        return FormateData({ candidate });
      }

      const candidate = await this.prisma.update({
        where: { id: candidateId },
        data: { name, number, dapil: { set: dapil } },
      });
      return FormateData({ candidate });
    } catch (error) {
      throw new APIError("Update Candidate Failed");
    }
  }

  async DeleteCandidate(candidateId) {
    try {
      const candidate = await this.prisma.delete({
        where: { id: candidateId },
      });
      await DeleteImage(candidate.imageId);
      return FormateData({ candidate });
    } catch (error) {
      throw new APIError("Get Candidate Failed");
    }
  }
}

module.exports = CandidateService;

const { FormateData } = require("../utils");
const { PrismaClient } = require("@prisma/client");
const { APIError } = require("../utils/app-errors");
const { generateCard, downloadCard } = require("../utils/generateCard");

class CardService {
  async GetCard(cardData) {
    try {
      const card = await generateCard(cardData);
      return FormateData({ card });
    } catch (error) {
      throw new APIError("Create City Failed");
    }
  }
}

module.exports = CardService;

const CardService = require("../services/card-service");

module.exports = (app) => {
  const service = new CardService();
  app.get("/card/:id", async (req, res, next) => {
    const id = req.params.id;

    try {
      const { data } = await service.GetCard(id);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

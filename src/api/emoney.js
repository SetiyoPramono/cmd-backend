const EmoneyService = require("../services/emoney-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new EmoneyService();

  app.post("/emoney", UserAuth, async (req, res, next) => {
    const { name } = req.body;
    try {
      const { data } = await service.CreateEmoney(name);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/emoney", async (req, res, next) => {
    try {
      const { data } = await service.GetAllEmoney();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/emoney/:emoneyId", async (req, res, next) => {
    const emoneyId = req.params.emoneyId;
    try {
      const { data } = await service.GetEmoneyById(emoneyId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/emoney/:emoneyId", UserAuth, async (req, res, next) => {
    const emoneyId = req.params.emoneyId;
    const { name } = req.body;
    try {
      const { data } = await service.UpdateEmoney({ emoneyId, name });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/emoney/:emoneyId", UserAuth, async (req, res, next) => {
    const emoneyId = req.params.emoneyId;
    try {
      const { data } = await service.DeleteEmoney(emoneyId);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

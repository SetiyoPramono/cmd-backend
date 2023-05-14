const ProvinceService = require("../services/province-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new ProvinceService();

  app.post("/province", UserAuth, async (req, res, next) => {
    const { name } = req.body;
    try {
      const { data } = await service.CreateProvince({ name });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/province", async (req, res, next) => {
    try {
      const { data } = await service.GetProvince();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/province/:provinceId", async (req, res, next) => {
    const provinceId = req.params.provinceId;
    try {
      const { data } = await service.GetProvinceById(provinceId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/province/:provinceId", UserAuth, async (req, res, next) => {
    const provinceId = req.params.provinceId;
    const { name } = req.body;
    try {
      const { data } = await service.UpdateProvince({ provinceId, name });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/province/:provinceId", UserAuth, async (req, res, next) => {
    const provinceId = req.params.provinceId;
    try {
      const { data } = await service.DeleteProvince(provinceId);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

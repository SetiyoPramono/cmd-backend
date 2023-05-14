const CityService = require("../services/city-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new CityService();

  app.post("/city", UserAuth, async (req, res, next) => {
    const { name, provinceId } = req.body;
    try {
      const { data } = await service.CreateCity({ name, provinceId });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/city", async (req, res, next) => {
    try {
      const { data } = await service.GetCity();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/city/province", async (req, res, next) => {
    const provinceId = req.query.provinceId;

    try {
      const { data } = await service.GetCityByProvinceId(provinceId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/city/:cityId", async (req, res, next) => {
    const cityId = req.params.cityId;
    try {
      const { data } = await service.GetCityById(cityId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/city/:cityId", UserAuth, async (req, res, next) => {
    const cityId = req.params.cityId;
    const { name, provinceId } = req.body;
    try {
      const { data } = await service.UpdateCity({ cityId, name, provinceId });
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/city/:cityId", UserAuth, async (req, res, next) => {
    const cityId = req.params.cityId;
    try {
      const { data } = await service.DeleteCity(cityId);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

const SubdistrictService = require("../services/subdistrict-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new SubdistrictService();

  app.post("/subdistrict", UserAuth, async (req, res, next) => {
    const { name, cityId } = req.body;
    try {
      const { data } = await service.CreateSubdistrict({ name, cityId });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/subdistrict/city", async (req, res, next) => {
    const cityId = req.query.cityId;
    try {
      const { data } = await service.GetSubdistrictByCityId(cityId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/subdistrict", async (req, res, next) => {
    try {
      const { data } = await service.GetSubdistrict();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/subdistrict/:subdistrictId", async (req, res, next) => {
    const subdistrictId = req.params.subdistrictId;
    try {
      const { data } = await service.GetSubdistrictById(subdistrictId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/subdistrict/:subdistrictId", UserAuth, async (req, res, next) => {
    const subdistrictId = req.params.subdistrictId;
    const { name, cityId } = req.body;
    try {
      const { data } = await service.UpdateSubdistrict({
        subdistrictId,
        name,
        cityId,
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete(
    "/subdistrict/:subdistrictId",
    UserAuth,
    async (req, res, next) => {
      const subdistrictId = req.params.subdistrictId;
      try {
        const { data } = await service.DeleteSubdistrict(subdistrictId);
        res.json(data);
      } catch (error) {
        next(error);
      }
    }
  );
};

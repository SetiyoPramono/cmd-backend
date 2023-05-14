const VillageService = require("../services/village-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new VillageService();

  app.post("/village", UserAuth, async (req, res, next) => {
    const { name, subdistrictId } = req.body;
    try {
      const { data } = await service.CreateVillage({ name, subdistrictId });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/village/subdistrict", async (req, res, next) => {
    const subdistrictId = req.query.subdistrictId;
    try {
      const { data } = await service.GetVillageBySubdistrictId(subdistrictId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/village", async (req, res, next) => {
    try {
      const { data } = await service.GetVillage();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/village/:villageId", async (req, res, next) => {
    const villageId = req.params.villageId;
    try {
      const { data } = await service.GetVillageById(villageId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/village/:villageId", UserAuth, async (req, res, next) => {
    const villageId = req.params.villageId;
    const { name, subdistrictId } = req.body;
    try {
      const { data } = await service.UpdateVillage({
        villageId,
        name,
        subdistrictId,
      });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/village/:villageId", UserAuth, async (req, res, next) => {
    const villageId = req.params.villageId;
    try {
      const { data } = await service.DeleteVillage(villageId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

const RoleService = require("../services/role-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new RoleService();

  app.post("/role", UserAuth, async (req, res, next) => {
    const { name } = req.body;
    try {
      const { data } = await service.CreateRole({ name });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/roles", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.GetRoles();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/role/:roleId", UserAuth, async (req, res, next) => {
    const roleId = req.params.roleId;

    try {
      const { data } = await service.GetRoleById(roleId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/role/:roleId", UserAuth, async (req, res, next) => {
    const roleId = req.params.roleId;
    const { name } = req.body;
    try {
      const { data } = await service.UpdateRole({ roleId, name });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/role/:roleId", UserAuth, async (req, res, next) => {
    const roleId = req.params.roleId;
    try {
      const { data } = await service.DeleteRole(roleId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

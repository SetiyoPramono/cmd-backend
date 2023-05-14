const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new UserService();

  app.post("/user/signup", async (req, res, next) => {
    try {
      const { username, password, role } = req.body;
      const { data } = await service.SignUp({ username, password, role });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.post("/user/signin", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const { data } = await service.SignIn({ username, password });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/users", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.GetUsers();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/user/authenticate", UserAuth, async (req, res, next) => {
    try {
      const signature = req.headers.authorization;
      const { data } = await service.ValidateUser(signature.split(" ")[1]);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/user/:userId", UserAuth, async (req, res, next) => {
    const userId = req.params.userId;

    try {
      const { data } = await service.GetUserById(userId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/user/:userId", UserAuth, async (req, res, next) => {
    const userId = req.params.userId;
    const { username, password, role } = req.body;

    try {
      const { data } = await service.UpdateUser({
        userId,
        username,
        password,
        role,
      });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/user/:userId", UserAuth, async (req, res, next) => {
    const userId = req.params.userId;

    try {
      const { data } = await service.DeleteUser(userId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

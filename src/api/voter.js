const VoterService = require("../services/voter-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new VoterService();

  app.post("/voter", async (req, res, next) => {
    const dataBody = req.body;
    try {
      const { data } = await service.CreateVoter(dataBody);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/voter", UserAuth, async (req, res, next) => {
    try {
      const { data } = await service.GetVoters();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/voter/:voterId", UserAuth, async (req, res, next) => {
    const voterId = req.params.voterId;
    try {
      const { data } = await service.GetVoterById(voterId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/scan/:voterId", UserAuth, async (req, res, next) => {
    const voterId = req.params.voterId;
    try {
      const { data } = await service.ScanVoter(voterId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/voter/:voterId", async (req, res, next) => {
    const dataBody = req.body;
    const voterId = req.params.voterId;
    try {
      const { data } = await service.UpdateVoter({ voterId, ...dataBody });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/voter/:voterId", UserAuth, async (req, res, next) => {
    const voterId = req.params.voterId;
    try {
      const { data } = await service.DeleteVoter(voterId);

      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

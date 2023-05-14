const CandidateService = require("../services/candidate-service");
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const service = new CandidateService();

  app.post("/candidate", UserAuth, async (req, res, next) => {
    const { name, image, number, dapil } = req.body;
    try {
      const { data } = await service.CreateCandidate({
        name,
        image,
        number,
        dapil,
      });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/candidate", async (req, res, next) => {
    try {
      const { data } = await service.GetCandidate();
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/candidate/city", async (req, res, next) => {
    const dapil = req.query.dapil;
    try {
      const { data } = await service.GetCandidateBydapil(dapil);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.get("/candidate/:candidateId", async (req, res, next) => {
    const candidateId = req.params.candidateId;
    try {
      const { data } = await service.GetCandidateById(candidateId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.put("/candidate/:candidateId", UserAuth, async (req, res, next) => {
    const candidateId = req.params.candidateId;
    const { name, image, number, dapil } = req.body;
    try {
      const { data } = await service.UpdateCandidate({
        candidateId,
        name,
        image,
        number,
        dapil,
      });
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/candidate/:candidateId", UserAuth, async (req, res, next) => {
    const candidateId = req.params.candidateId;
    try {
      const { data } = await service.DeleteCandidate(candidateId);
      return res.json({ data });
    } catch (error) {
      next(error);
    }
  });
};

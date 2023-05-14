const UserAuth = require("./middlewares/auth");
const DashboardService = require("../services/dashboard-service");

module.exports = (app) => {
  const service = new DashboardService();

  app.get("/dashboard", UserAuth, async (req, res, next) => {
    try {
      const allVoter = await service.GetVoterAmount();
      const scannedVoter = await service.GetVoterScannedAmount();

      return res.json({
        data: { allVoter: allVoter.data, scannedVoter: scannedVoter.data },
      });
    } catch (error) {
      next(error);
    }
  });
};

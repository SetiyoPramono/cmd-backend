const express = require("express");
const cors = require("cors");
const HandleErrors = require("./utils/error-handler");
const {
  user,
  role,
  candidate,
  emoney,
  voter,
  province,
  subdistrict,
  city,
  village,
  dashboard,
  card,
} = require("./api");

module.exports = async (app) => {
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "10mb" }));

  // api
  user(app);
  role(app);
  candidate(app);
  emoney(app);
  voter(app);
  province(app);
  city(app);
  subdistrict(app);
  village(app);
  dashboard(app);
  card(app);

  // error handling
  app.use(HandleErrors);
};

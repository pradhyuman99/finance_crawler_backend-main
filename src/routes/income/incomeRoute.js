const {
  createIncome,
  fetchAllIncomes,
  fetchSingle,
  fetchSingleWithoutPagination,
  updateIncome,
  deleteIncome,
} = require("../../controllers/income/incomectlr");
const auth = require("../../middleware/authMiddleware");

const express = require("express");
const incomeRoute = express.Router();

incomeRoute.post("/", auth, createIncome);
incomeRoute.get("/all", auth, fetchAllIncomes);
incomeRoute.get("/:id", auth, fetchSingle);
incomeRoute.get("/wop/:id", auth, fetchSingleWithoutPagination);
incomeRoute.put("/:id/update", auth, updateIncome);
incomeRoute.delete("/:id/delete", auth, deleteIncome);

module.exports = incomeRoute;

const expressAsyncHandler = require("express-async-handler");

const expense = require("../../models/expense");

const createExpense = expressAsyncHandler(async (req, res) => {
  const { title, description, amount } = req?.body;
  try {
    const exp = await expense.create({
      title,
      description,
      amount,
      user: req?.user?.id,
    });
    res.json(exp);
  } catch (error) {
    res.json(error);
  }
});

// fetch all
const fetchExpenses = expressAsyncHandler(async (req, res) => {
  const page = Number(req?.query.page);
  try {
    const fetchAll = await expense.paginate(
      {},
      { limit: 5, page: page, populate: "user" }
    );
    res.json(fetchAll);
  } catch (error) {
    res.json(error);
  }
});

// fetch single expense
const fetchSingleExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const resultsPerPage = 5;
  const page = Number(req?.query.page);
  // console.log(id);
  try {
    const exp = await expense
      .find({ user: { _id: id } })
      .limit(resultsPerPage)
      .populate("user")
      .skip(resultsPerPage * (page - 1));

    const docs = await expense.find({ user: { _id: id } });

    const totalpages = Math.ceil(docs.length / resultsPerPage);
    // console.log(totalpages);
    // const exp1 = await exp.paginate(
    //   {},
    //   { limit: 7, page: page, populate: "user" }
    // );
    res.json({ exp: exp, totalPages: totalpages });
  } catch (error) {
    res.json(error);
  }
});

//fetch single expense without pagination
const fetchSingleWithoutPagination = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const exp = await expense.find({ user: { _id: id } });

    res.json(exp);
  } catch (error) {
    res.json(error);
  }
});

// update the expense
const updateExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, description, amount } = req?.body;
  try {
    const newExp = await expense.findByIdAndUpdate(
      id,
      { title, description, amount },
      { new: true }
    );
    res.json(newExp);
  } catch (error) {
    res.json(error);
  }
});

// delete expense
const deleteExpense = expressAsyncHandler(async (req, res) => {
  // console.log("here");
  const { id } = req?.params;
  try {
    const exp = await expense.findByIdAndDelete(id);
    res.json(exp);
  } catch (error) {
    console.log("error");
    res.json(error);
  }
});

module.exports = {
  createExpense,
  fetchExpenses,
  fetchSingleExpense,
  fetchSingleWithoutPagination,
  updateExpense,
  deleteExpense,
};

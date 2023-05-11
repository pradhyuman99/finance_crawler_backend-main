const income = require("../../models/income");
const expressAsyncHandler = require("express-async-handler");

const createIncome = expressAsyncHandler(async (req, res) => {
  console.log(req?.body);
  const { title, description, amount } = req?.body;
  try {
    const inc = await income.create({
      title,
      description,
      amount,
      user: req?.user?._id,
    });
    res.json(inc);
  } catch (error) {
    res.json(error);
  }
});

//fetch all the incomes
const fetchAllIncomes = expressAsyncHandler(async (req, res) => {
  // console.log(req?.user);
  const page = Number(req?.query.page);
  // console.log(page);
  try {
    const allIncomes = await income.paginate(
      {},
      { limit: 10, page: page, populate: "user" }
    );
    res.json(allIncomes);
  } catch (error) {
    res.json(error);
  }
});

//fetch single income
const fetchSingle = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const resultsPerPage = 5;
  const page = Number(req?.query.page);
  console.log(page);
  try {
    const inc = await income
      .find({ user: { _id: id } })
      .limit(resultsPerPage)
      .populate("user")
      .skip(resultsPerPage * (page - 1));

    const docs = await income.find({ user: { _id: id } });

    const totalpages = Math.ceil(docs.length / resultsPerPage);
    // console.log(totalpages);
    // const exp1 = await exp.paginate(
    //   {},
    //   { limit: 7, page: page, populate: "user" }
    // );
    res.json({ inc: inc, totalPages: totalpages });
  } catch (error) {
    res.json(error);
  }
});

//fetch single income without pagination
const fetchSingleWithoutPagination = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const inc = await income.find({ user: { _id: id } });

    res.json(inc);
  } catch (error) {
    res.json(error);
  }
});

//update
const updateIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, description, amount } = req?.body;
  try {
    const inc = await income.findByIdAndUpdate(
      id,
      { title, description, amount },
      { new: true }
    );
    res.json(inc);
  } catch (error) {
    res.json(error);
  }
});

//delete
const deleteIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const delIncome = await income.findByIdAndDelete(id);
    res.json(delIncome);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createIncome,
  fetchAllIncomes,
  fetchSingle,
  fetchSingleWithoutPagination,
  updateIncome,
  deleteIncome,
};

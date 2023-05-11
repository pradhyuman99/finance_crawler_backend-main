const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    msg: err?.message,
    stack: process.env.NODE_ENV === "production" ? null : err?.stack,
  });
};

const notFound = (req, res, next) => {
  const err = new Error("Not found");
  res.status(404);
  next(err);
};

module.exports = { errorHandler, notFound };

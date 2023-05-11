const cors = require("cors");

// const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const usersRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const expRoute = require("./routes/expenses/expenseRoute");
const app = express();

//env
dotenv.config();

//database connect
db();


//middleware
app.use(express.json()); // to allow posting json data

//setting up cors
app.use(cors());

// ------------------ Sentry ----------------------

const Sentry = require("@sentry/node");

// Importing @sentry/tracing patches the global hub for tracing to work.
const SentryTracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://b0e166ee11434bbe9f544e8a35576bc8@o1230295.ingest.sentry.io/6376883",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new SentryTracing.Integrations.Express({
    app,
    }),
    ],
    
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
// -------------------------------------------------

// //setting up cors
app.use(cors());


//users routes
app.use("/api/users", usersRoute);
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the Finance Crawler!" });
});

//income routes
app.use("/api/income", incomeRoute);

//expense routes
app.use("/api/expense", expRoute);
//app.get("//", fwbheofhw);

//error handling
app.use(notFound);
app.use(errorHandler);



module.exports = app;

const express = require("express");
const app = express();
const cors = require("cors");
const UsersRouter = require('../routes/users');
const BannersRouter = require('../routes/banners');
const ServicesRouter = require('../routes/services');
const BalanceRouter = require('../routes/balance');
const TransactionsRouter = require('../routes/transactions');
import helmet from "helmet";

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(UsersRouter);
app.use(BannersRouter);
app.use(ServicesRouter);
app.use(BalanceRouter);
app.use(TransactionsRouter);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
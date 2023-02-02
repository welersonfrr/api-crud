import express, { Request, Response } from "express";
import { transactionRoutes } from "./routes/transaction.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());

// USER
app.use("/user", userRoutes());

// TRANSACTIONS
app.use("/user/:userId/transactions", transactionRoutes());

// http://localhost:3333
app.listen(3333, () => {
  console.log("API está rodando!");
});

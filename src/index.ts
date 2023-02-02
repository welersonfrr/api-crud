import express, { Request, Response } from "express";
import { transactionRoutes } from "./routes/transaction.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    ok: true,
    msg: "Possiveis rotas",
    data: {
      user: {
        get1: "http://localhost:3333/user",
        get2: "http://localhost:3333/user/:id",
        post: "http://localhost:3333/user/",
        put: "http://localhost:3333/user/:id",
        delete: "http://localhost:3333/user/:id",
      },
      transactions: {
        get1: "http://localhost:3333/user/:userId/transactions",
        get2: "http://localhost:3333/user/:userId/transactions/:id",
        post: "http://localhost:3333/user/:userId/transactions/",
        put: "http://localhost:3333/user/:userId/transactions/:id",
        delete: "http://localhost:3333/user/:userId/transactions/:id",
      },
    },
  });
});

// USER
app.use("/user", userRoutes());

// TRANSACTIONS
// app.use("/user/:userId/transactions", transactionRoutes());

// http://localhost:3333
app.listen(3333, () => {
  console.log("API está rodando!");
});

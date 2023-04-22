import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database"

// @types/express
const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error!"
  })
})

app.listen(3000, () => {
  console.log("Server is running")
})






/*
Tipos de parâmetros

Routes Params => http://localhost:3000/produtos/75458495498

Query Params => http://localhost:3000/produtos?name=teclado&description=tecladopreto

Body Params => {
  "name": "teclado",
  "description" "teclado preto"
} vêm no corpo da requisição

*/


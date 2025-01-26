import expess from "express";
import { connectionDB } from "./database";
import App  from './expressServices'
const startServer = async () => {
  const app = expess();
    await connectionDB();
    await App(app)
  app.listen(8002, () => {
    console.log("Product is listene on port: 8002");
  });
};
startServer();

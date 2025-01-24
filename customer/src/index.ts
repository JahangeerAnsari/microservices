import express from "express";
import connectionDB from "./operation/database";
import App from "./operation/expressServices";
 
const startServer = async () => {
  const app = express();
  await connectionDB();
  await App(app);
  app.listen(8001, () => {
    console.log("Customer is listen at port :8001");
  });
};
startServer();

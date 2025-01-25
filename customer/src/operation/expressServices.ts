import express, { Application } from "express";
import bodyParser from "body-parser";
import { customerRoute } from "../routes";
import { errorHandler } from "../middlewares";
import { appEvents } from "../controllers";

export default async (app: Application) => {
  app.use(bodyParser.json());
  // for image file
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use("/images", express.static(path.join("photos")));
  // EVENT LISTENING
  
  
  appEvents(app);
  console.log("test 1");
  app.use("/customer", customerRoute);
  // app.use(shoppingRoute);
  app.use(errorHandler);
  return app;
};

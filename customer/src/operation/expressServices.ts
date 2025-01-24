import express, { Application } from "express";
import bodyParser from "body-parser";
// import { adminRouter, vandorRouter } from '.';
// import path from "path";
import {

  customerRoute,
  
} from "../routes";
import { errorHandler } from "../middlewares";

export default async (app: Application) => {
  app.use(bodyParser.json());
  // for image file
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use("/images", express.static(path.join("photos")));
  // routes
  // app.use("/admin", adminRouter);
  // app.use("/vandor", vandorRouter);
   app.use("/customer", customerRoute);
  // app.use(shoppingRoute);
  app.use(errorHandler);
  return app;
};

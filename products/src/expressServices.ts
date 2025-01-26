import bodyParser from "body-parser";
import { Application } from "express";
import { errorHandler } from "./middlewares";
import { productRoute } from "./routes";
import { appEvents } from "./controller";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  appEvents(app)
  app.use("/product", productRoute);
  app.use(errorHandler);
  return app;
};

import { NextFunction, Response, Request } from "express";

export const appEvents = (app: any) => {
  
  app.use(
    "/app-events",
    async (req: Request, res: Response, next: NextFunction) => {
      const { payload } = req.body;
    
      console.log("===================>Product Service Events");
      return res.status(200).json(payload);
    }
  );
};

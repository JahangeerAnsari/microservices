import { NextFunction, Response, Request } from "express";
import { CustomerService } from "../services"

export const appEvents = (app:any) => {
    const service = new CustomerService();
   
    
    app.use('/app-events', async (req: Request, res: Response, next: NextFunction) => {
        const { payload } = req.body;
       await service.SubscribeEvents(payload);
        console.log("===================>SubscribeEvents");
        return res.status(200).json(payload)
        
    })
  }

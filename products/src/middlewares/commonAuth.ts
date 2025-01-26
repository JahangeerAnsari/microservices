
import { Request, Response, NextFunction } from "express";
import { BadRequestError, validateSignature } from "../utility";
import { AuthPayload } from "../database/dto/Auth.dto";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValid = await validateSignature(req);

  if (isValid) {
    next();
  } else {
    res.status(401).json({
      message: "Not a Valid authorization user",
    });
    return;
  }
};

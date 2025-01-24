import { Request, Response, NextFunction } from "express";
import { AppError } from "../utility/app-errors"

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const response = {
    name: err.name,
    message: err.message,
    ...(err.isOperational && { stack: err.errorStack }), // Include stack only if it's operational
  };

  // Log error if required
  if (err.logError) {
    console.error(err);
  }

  res.status(statusCode).json(response);
};

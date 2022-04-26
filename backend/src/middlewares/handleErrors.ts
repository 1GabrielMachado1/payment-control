import { Request, Response, NextFunction } from "express";
import AppError from "../errors/appError";

export function handleError(error: AppError, req: Request, res: Response, next: NextFunction) {
  const { message = "Unexpected error", statusCode = 500 } = error;

  return res.status(statusCode).json({
    status: "Error",
    message,
  });
};

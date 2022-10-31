import { Response } from "./api";
import { ErrorRequestHandler } from "express";

export class ApiError extends Error implements Response {
  readonly status = "error";

  constructor(readonly message: string, readonly code: number) {
    super(message);
  }
}

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof ApiError) {
    const { status, code, message } = err;
    const response: Response = {
      status, code, message,
    };
    res.json(response).status(response.code);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  const response: Response = {
    status: "error", code: 500,
  };
  res.json(response).status(response.code);
};

import { Handler } from "express";
import { DataResponse } from "./api";

export type DataResponseHandler<T> = (...params: Parameters<Handler>) => Promise<DataResponse<T>>

export const handleCatching: <T>(handler: DataResponseHandler<T>) => Handler = (handler) => {
  return async (req, res, next) => {
    try {
      const response = await handler(req, res, next);
      res.json(response).status(response.code);
    } catch (error) {
      next(error);
    }
  };
};

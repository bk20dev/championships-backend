import { Response } from "./api";

export class ApiError extends Error implements Response {
  readonly status = "error";

  constructor(readonly message: string, readonly code: number) {
    super(message);
  }
}

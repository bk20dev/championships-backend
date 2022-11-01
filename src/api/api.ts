export type ResponseStatus = "ok" | "error";

export interface Response {
  status: ResponseStatus;
  code: number;
  message?: string;
}

export interface DataResponse<T>
  extends Response {
  data: T | T[];
}

export interface ResultResponse<T> {
  Success: boolean;
  httpStatusCode: number;
  message: string;
  Data: T;
  totalCount: number;
}

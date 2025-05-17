export interface HttpRes {
  body: unknown,
  state: number | string,
  error: HttpError | null
};

export interface HttpError{
  statusCode: number,
  message: string,
  stackTrace: unknown
}
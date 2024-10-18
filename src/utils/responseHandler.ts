
class BadRequestError extends Error {
  public status: number;
  public error: any;
  constructor(message: string, error: any = undefined) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
    this.error = error
  }
}

class NotFoundError extends Error {
  public status: number;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class UnauthorizedError extends Error {
  public status: number;
  public error: any;
  constructor(message: string, error: any = undefined) {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
    this.error = error;
  }
}


export { NotFoundError, BadRequestError, UnauthorizedError }

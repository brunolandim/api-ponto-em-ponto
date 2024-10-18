import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export default class ApiResponseHandler {
  public static success<T>(res: Response, data: T, message = 'Operação realizada com sucesso', status = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    res.status(status).json(response);
  }

  public static error(res: Response, message: string, status: number = 500, error: any): void {
    const response: ApiResponse<null> = {
      success: false,
      message,
      error
    };
    res.status(status).json(response);
  }
}
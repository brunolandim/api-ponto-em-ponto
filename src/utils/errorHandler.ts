
import { Request, Response, NextFunction } from 'express';
import ApiResponseHandler from '../utils/ApiResponseHandler';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  const status = err.status || 500;
  const message = err.message || 'Ocorreu um erro no servidor';
  const error = err.error

  console.error(`Erro: ${status} - ${message}`);

  ApiResponseHandler.error(res, message, status, error);
}

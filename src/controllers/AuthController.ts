// controllers/AuthController.ts
import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class AuthController {

  public requestCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await AuthService.requestCode(req.body.email);

      ApiResponseHandler.success<null>(res, null, 'Email enviado com sucesso');
    } catch (err) {
      next(err);
    }
  }

  public getUserConfirmationVerificationCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = await AuthService.getUserConfirmationVerificationCode(req.body.email, req.body.shortCode);

      ApiResponseHandler.success<{ token: string }>(res, { token }, 'Usuário autorizado');
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/responseHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  id: string;
  role: string;
}

class VerifyToken {
  public userToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      const error = new UnauthorizedError('Acesso negado');
      return next(error);
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;

      next();
    } catch (error) {
      next(error)
    }
  };

}

export default new VerifyToken();
// controllers/UserController.ts
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class UserController {

  public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.createUser({ ...req.body, company: req.user.company });

      ApiResponseHandler.success(res, user, 'Usuário criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);

      ApiResponseHandler.success(res, user, 'Usuário encontrado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);

      ApiResponseHandler.success(res, user, 'Usuário atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await UserService.deleteUser(req.params.id);

      ApiResponseHandler.success(res, null, 'Usuário excluído com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAllUsers();

      ApiResponseHandler.success(res, users, 'Usuários recuperados com sucesso');
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

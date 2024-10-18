// controllers/WorkLogController.ts
import { Request, Response, NextFunction } from 'express';
import WorkLogService from '../services/WorkLogService';
import ApiResponseHandler from '../utils/ApiResponseHandler';

class WorkLogController {

  public async createWorkLog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const workLog = await WorkLogService.createWorkLog(req.body);

      ApiResponseHandler.success(res, workLog, 'Registro de trabalho criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getWorkLogById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const workLog = await WorkLogService.getWorkLogById(req.params.id);

      ApiResponseHandler.success(res, workLog, 'Registro de trabalho encontrado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async updateWorkLog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const workLog = await WorkLogService.updateWorkLog(req.params.id, req.body);

      ApiResponseHandler.success(res, workLog, 'Registro de trabalho atualizado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async deleteWorkLog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await WorkLogService.deleteWorkLog(req.params.id);

      ApiResponseHandler.success(res, null, 'Registro de trabalho excluído com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getAllWorkLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const workLogs = await WorkLogService.getAllWorkLogs();

      ApiResponseHandler.success(res, workLogs, 'Registros de trabalho recuperados com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getWorkLogsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const workLogs = await WorkLogService.getWorkLogsByUserId(req.params.userId);

      ApiResponseHandler.success(res, workLogs, 'Registros de trabalho do usuário recuperados com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getWorkLogsByCompanyId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const workLogs = await WorkLogService.getWorkLogsByCompanyId(req.params.companyId);

      ApiResponseHandler.success(res, workLogs, 'Registros de trabalho da empresa recuperados com sucesso');
    } catch (error) {
      next(error);
    }
  }
}

export default new WorkLogController();

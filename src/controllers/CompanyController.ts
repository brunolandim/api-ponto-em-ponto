import { Request, Response, NextFunction } from 'express';
import ApiResponseHandler from '../utils/ApiResponseHandler';
import CompanyService from '../services/CompanyService';

class CompanyController {

  public async createCompanyWithAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { companyData, adminData } = req.body;
      const company = await CompanyService.createCompanyWithAdmin(companyData, adminData);
      ApiResponseHandler.success(res, company, 'Empresa criada com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getCompanyById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const company = await CompanyService.getCompanyById(req.params.id);
      ApiResponseHandler.success(res, company, 'Empresa encontrada com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async updateCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const company = await CompanyService.updateCompany(req.params.id, req.body);
      ApiResponseHandler.success(res, company, 'Empresa atualizada com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async deleteCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await CompanyService.deleteCompany(req.params.id);
      ApiResponseHandler.success(res, null, 'Empresa excluída com sucesso');
    } catch (error) {
      next(error);
    }
  }

  public async getAllCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companies = await CompanyService.getAllCompanies();
      ApiResponseHandler.success(res, companies, 'Empresas recuperadas com sucesso');
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();

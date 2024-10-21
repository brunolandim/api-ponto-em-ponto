import { Request, Response, NextFunction } from 'express';
import CompanyPaymentService from '../services/CompanyPaymentService';
import ApiResponseHandler from '../utils/ApiResponseHandler';
import { ICompanyPayment } from '../models/CompanyPayment';

class CompanyPaymentController {

  public createMonthlyPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await CompanyPaymentService.createMonthlyPayment(req.body.companyId);

      ApiResponseHandler.success<null>(res, null, 'Pagamento criado com sucesso.');
    } catch (err) {
      next(err);
    }
  }

  public getCompanyPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payments = await CompanyPaymentService.getCompanyPayments(req.params.companyId);

      ApiResponseHandler.success<ICompanyPayment[]>(res, payments, 'Pagamentos recuperados com sucesso.');
    } catch (err) {
      next(err);
    }
  }
}

export default new CompanyPaymentController();

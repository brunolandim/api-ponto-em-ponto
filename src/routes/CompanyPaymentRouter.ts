import { Router } from 'express';
import CompanyPaymentController from '../controllers/CompanyPaymentController';

const companyPaymentRouter = Router();

companyPaymentRouter.post('/create', CompanyPaymentController.createMonthlyPayment);
companyPaymentRouter.get('/:companyId', CompanyPaymentController.getCompanyPayments);

export default companyPaymentRouter;

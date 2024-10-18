import express, { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import { createCompanyAdminSchema } from '../validations/createCompanyAdminSchema';
import validateRequest from '../utils/validateRequest';

const companyRouter: Router = express.Router();

companyRouter.post('/create', validateRequest(createCompanyAdminSchema), CompanyController.createCompanyWithAdmin);
companyRouter.get('/all', CompanyController.getAllCompanies);
companyRouter.get('/:id', CompanyController.getCompanyById);
companyRouter.put('/update/:id', CompanyController.updateCompany);
companyRouter.delete('/delete/:id', CompanyController.deleteCompany);

export default companyRouter;

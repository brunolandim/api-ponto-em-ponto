import express, { Router } from 'express';
import WorkLogController from '../controllers/WorkLogController';

const workLogRouter: Router = express.Router();

workLogRouter.post('/create', WorkLogController.createWorkLog);
workLogRouter.get('/all', WorkLogController.getAllWorkLogs);
workLogRouter.get('/:id', WorkLogController.getWorkLogById);
workLogRouter.put('/update/:id', WorkLogController.updateWorkLog);
workLogRouter.delete('/delete/:id', WorkLogController.deleteWorkLog);
workLogRouter.get('/user/:userId', WorkLogController.getWorkLogsByUserId);
workLogRouter.get('/company/:companyId', WorkLogController.getWorkLogsByCompanyId);

export default workLogRouter;

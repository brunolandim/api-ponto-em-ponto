import express, { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRouter: Router = express.Router();

authRouter.post('/request-confirmation-code', AuthController.requestCode);
authRouter.post('/confirmation-code-authorization', AuthController.getUserConfirmationVerificationCode);


export default authRouter;

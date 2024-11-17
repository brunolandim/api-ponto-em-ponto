import express, { Router } from 'express';
import UserController from '../controllers/UserController';
import validateRequest from '../utils/validateRequest';
import { createUserSchema } from '../validations/createUserSchema';
import VerifyToken from '../middlewares/VerifyToken';

const userRouter: Router = express.Router();

userRouter.get('/all', UserController.getAllUsers);
userRouter.get('/userid/:id', VerifyToken.userToken, UserController.getUserById);
userRouter.post('/create', validateRequest(createUserSchema), VerifyToken.userTokenAndRole, UserController.createUser);
userRouter.put('/update/:id', UserController.updateUser);
userRouter.delete('/delete/:id', UserController.deleteUser);


export default userRouter;

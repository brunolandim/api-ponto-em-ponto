import { Request, Response, NextFunction } from 'express';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';
import { BadRequestError } from './responseHandler';

const validateRequest = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: { [key: string]: string } = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        next(new BadRequestError('Erro de validação', validationErrors));
      }
      next(err);
    }
  };
};

export default validateRequest;

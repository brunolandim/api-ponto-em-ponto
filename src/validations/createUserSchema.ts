import * as Yup from 'yup';
import { UserRole } from '../enum/UserRole';

export const createUserSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  name: Yup.string().min(3, 'Nome deve ter no mínimo 3 caracteres').required('Nome é obrigatório'),
  role: Yup.string()
    .oneOf([UserRole.User, UserRole.Admin], 'Role deve ser "User" ou "Admin"')
    .required('Role é obrigatório'),
  hourlyRate: Yup.number().required('É necessário cadastrar pago por hora trabalhada')
});

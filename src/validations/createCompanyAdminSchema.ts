import * as Yup from 'yup';
import { UserRole } from '../enum/UserRole';

export const createCompanyAdminSchema = Yup.object({
  companyName: Yup.string()
    .min(3, 'Nome da empresa deve ter no mínimo 3 caracteres')
    .required('Nome da empresa é obrigatório'),
  user: Yup.object({
    name: Yup.string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    role: Yup.string()
      .oneOf([UserRole.Admin], 'Role deve ser "Admin"')
      .required('Role é obrigatório'),
  }),
});

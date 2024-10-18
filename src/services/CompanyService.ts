import mongoose from 'mongoose';
import { ICompany, Company } from '../models/Company';
import { IUser, User } from '../models/User';
import { BadRequestError, NotFoundError } from '../utils/responseHandler';
import UserService from './UserService';

class CompanyService {

  public async createCompanyWithAdmin(companyData: Partial<ICompany>, adminData: IUser): Promise<ICompany> {
    const existingCompany = await Company.findOne({ name: companyData.name });
    if (existingCompany) {
      throw new BadRequestError('Uma empresa com este nome já foi registrada.');
    }

    const existingUser = await User.findOne({ email: adminData.email });
    if (existingUser) {
      throw new BadRequestError('Este e-mail já está registrado.');
    }

    const newAdmin = await UserService.createUser(adminData);

    const newCompany = await Company.create({ ...companyData, adminId: newAdmin._id });
    await User.findByIdAndUpdate(newAdmin._id, { companyId: newCompany._id })

    return newCompany;
  }

  public async getCompanyById(companyId: string): Promise<ICompany> {
    const company = await Company.findById(companyId).populate('admin');
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.');
    }
    return company;
  }

  public async updateCompany(companyId: string, updateData: Partial<ICompany>): Promise<ICompany> {
    const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true }).populate('admin');
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.');
    }
    return company;
  }

  public async deleteCompany(companyId: string): Promise<void> {
    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      throw new NotFoundError('Empresa não encontrada.');
    }
  }

  public async getAllCompanies(): Promise<ICompany[]> {
    return await Company.find().populate('admin');
  }
}

export default new CompanyService();

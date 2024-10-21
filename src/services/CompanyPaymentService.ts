import { Company } from "../models/Company";
import { CompanyPayment, ICompanyPayment } from "../models/CompanyPayment";
import { BadRequestError, NotFoundError } from "../utils/responseHandler";

class CompanyPaymentService {

  private calculateCompanyPayment(totalUsers: number): number {
    if (totalUsers === 0) {
      return 0;
    } else if (totalUsers <= 10) {
      return 59.90;
    } else if (totalUsers <= 20) {
      return 89.90;
    } else {
      return 119.90;
    }
  }


  public async createMonthlyPayment(companyId: string): Promise<void> {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const company = await Company.findById(companyId).populate('users');

    if (!company) {
      throw new NotFoundError('Empresa não encontrada.');
    }

    const totalUsers = company.users ? company.users.length : 0;

    const totalAmount = this.calculateCompanyPayment(totalUsers);
    const existPayment = await CompanyPayment.findOne({ companyId, month, year })
    if (!existPayment) {
      await CompanyPayment.create({
        companyId: company._id,
        month,
        year,
        totalUsers,
        totalAmount,
        paymentDate: new Date(),
      });
    }
  }


  public async getCompanyPayments(companyId: string): Promise<ICompanyPayment[]> {
    const payments = await CompanyPayment.find({ companyId }).sort({ createdAt: -1 });

    if (!payments) {
      throw new NotFoundError('Pagamentos não encontrados.');
    }

    return payments;
  }
}

export default new CompanyPaymentService();

import cron from 'node-cron';
import CompanyPaymentService from '../services/CompanyPaymentService';
import { Company } from '../models/Company';

// Função que será executada pelo cron job
const processMonthlyPayments = async () => {
  try {
    const companies = await Company.find({ status: 'ACTIVE' }).exec();

    if (companies.length === 0) {
      console.log('Nenhuma empresa encontrada para processar os pagamentos.');
      return;
    }

    for (const company of companies) {
      try {
        await CompanyPaymentService.createMonthlyPayment(String(company._id));
        console.log(`Pagamento mensal criado para a empresa ${company.name}`);
      } catch (error) {
        console.error(`Erro ao criar o pagamento para a empresa ${company.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Erro ao processar os pagamentos mensais:', error);
  }
};

cron.schedule('0 0 10 * *', async () => {
  console.log('Iniciando o processo de pagamentos mensais...');
  await processMonthlyPayments();
  console.log('Processo de pagamentos mensais concluído.');
});

import { IWorkLog, WorkLog } from '../models/WorkLog';
import { BadRequestError, NotFoundError } from '../utils/responseHandler';

class WorkLogService {

  public async createWorkLog(workLogData: IWorkLog): Promise<IWorkLog> {
    const existingLog = await WorkLog.findOne({
      userId: workLogData.userId,
      companyId: workLogData.companyId,
      date: workLogData.date,
    });

    if (existingLog) {
      throw new BadRequestError('Já existe um registro de trabalho para este usuário e data.');
    }

    const newWorkLog = await WorkLog.create(workLogData);
    return newWorkLog;
  }

  public async getWorkLogById(workLogId: string): Promise<IWorkLog> {
    const workLog = await WorkLog.findById(workLogId).populate('user').populate('company');
    if (!workLog) {
      throw new NotFoundError('Registro de trabalho não encontrado.');
    }
    return workLog;
  }

  public async updateWorkLog(workLogId: string, updateData: Partial<IWorkLog>): Promise<IWorkLog> {
    const workLog = await WorkLog.findByIdAndUpdate(workLogId, updateData, { new: true }).populate('user').populate('company');
    if (!workLog) {
      throw new NotFoundError('Registro de trabalho não encontrado.');
    }
    return workLog;
  }

  public async deleteWorkLog(workLogId: string): Promise<void> {
    const workLog = await WorkLog.findByIdAndDelete(workLogId);
    if (!workLog) {
      throw new NotFoundError('Registro de trabalho não encontrado.');
    }
  }

  public async getAllWorkLogs(): Promise<IWorkLog[]> {
    return await WorkLog.find().populate('user').populate('company');
  }

  public async getWorkLogsByUserId(userId: string): Promise<IWorkLog[]> {
    return await WorkLog.find({ userId }).populate('user').populate('company');
  }

  public async getWorkLogsByCompanyId(companyId: string): Promise<IWorkLog[]> {
    return await WorkLog.find({ companyId }).populate('user').populate('company');
  }
}

export default new WorkLogService();

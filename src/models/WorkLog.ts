import { Schema, model, Document } from 'mongoose';

export interface IWorkLog extends Document {
  userId: Schema.Types.ObjectId;
  companyId: Schema.Types.ObjectId;
  date: Date;
  hoursWorked: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const workLogSchema = new Schema<IWorkLog>({
  userId: { type: Schema.Types.ObjectId, required: true },
  companyId: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
  description: { type: String },
}, { versionKey: false, timestamps: true });

workLogSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name email hourlyRate' },
});

workLogSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name' },
});

export const WorkLog = model<IWorkLog>('WorkLog', workLogSchema);

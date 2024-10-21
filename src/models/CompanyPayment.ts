import { Schema, model, Document } from 'mongoose';

export interface ICompanyPayment extends Document {
  companyId: Schema.Types.ObjectId;
  month: number;
  year: number;
  totalUsers: number;
  totalAmount: number;
  paymentDate: Date;
  paymentCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const companyPaymentSchema = new Schema<ICompanyPayment>({
  companyId: { type: Schema.Types.ObjectId, required: true, ref: 'Company' },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  totalUsers: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentDate: { type: Date, required: true, default: Date.now },
  paymentCompleted: { type: Boolean, required: true, default: false },
}, { versionKey: false, timestamps: true });

companyPaymentSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name' },
});

export const CompanyPayment = model<ICompanyPayment>('CompanyPayment', companyPaymentSchema);

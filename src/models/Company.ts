import { Schema, model, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  adminId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, required: true },
}, { versionKey: false, timestamps: true });

companySchema.virtual('admin', {
  ref: 'User',
  localField: 'adminId',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name email' },
});

export const Company = model<ICompany>('Company', companySchema);

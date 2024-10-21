import { Schema, model, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  adminId: Schema.Types.ObjectId;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
  users?: any[];
  admin?: any;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
    required: true
  },
}, { versionKey: false, timestamps: true });


companySchema.virtual('admin', {
  ref: 'User',
  localField: 'adminId',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name email' },
});

companySchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'companyId',
  justOne: false,
  match: { role: 'user' },
  options: { fields: '_id' }
});

export const Company = model<ICompany>('Company', companySchema);

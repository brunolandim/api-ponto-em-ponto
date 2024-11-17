import { Schema, model, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
  users?: any[];
  admin: {
    id: Schema.Types.ObjectId;
    name: string;
    email: string;
  };
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  admin: {
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
    required: true
  },
}, {
  versionKey: false,
  timestamps: true,
});


export const Company = model<ICompany>('Company', companySchema);

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'user';
  hourlyRate: number;
  confirmationCode?: string,
  codeExpiration?: Date,
  companyId?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmationCode: { type: String },
  codeExpiration: { type: Date },
  role: { type: String, enum: ['admin', 'user'], required: true },
  hourlyRate: {
    type: Number,
    required: function () {
      return this.role === 'user';
    },
  },
  companyId: { type: Schema.Types.ObjectId },
}, { versionKey: false, timestamps: true });

userSchema.virtual('company', {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name' },
});

export const User = model<IUser>('User', userSchema);

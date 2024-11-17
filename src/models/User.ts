import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'admin' | 'user';
  hourlyRate: number;
  confirmationCode?: string,
  codeExpiration?: Date,
  company: {
    id?: Schema.Types.ObjectId;
    name: string
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  confirmationCode: { type: String },
  company: { id: { type: Schema.Types.ObjectId }, name: { type: String } },
  codeExpiration: { type: Date },
  role: { type: String, enum: ['admin', 'user'], required: true },
  hourlyRate: {
    type: Number,
    required: function () {
      return this.role === 'user';
    },
  },
}, { versionKey: false, timestamps: true, });


export const User = model<IUser>('User', userSchema);

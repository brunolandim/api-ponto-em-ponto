import { Schema } from 'mongoose';

export interface CreateUserDTO {
  name: string;
  email: string;
  role: string;
  hourlyRate?: number;
  company?: { id: Schema.Types.ObjectId, name: string }
}

import mongoose, { Schema, Document } from 'mongoose';

export interface IVital extends Document {
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
}

const VitalSchemaMongoose = new Schema<IVital>({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const VitalModel = mongoose.model<IVital>('Vital', VitalSchemaMongoose);

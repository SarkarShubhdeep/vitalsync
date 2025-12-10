import { Type } from '@sinclair/typebox';

// TypeBox Schema for API
export const VitalSchema = Type.Object({
  _id: Type.Optional(Type.String()),
  type: Type.String(),
  value: Type.Number(),
  unit: Type.String(),
  timestamp: Type.String({ format: 'date-time' }),
});

export const CreateVitalSchema = Type.Omit(VitalSchema, ['_id']);

export const VitalResponseSchema = Type.Object({
  data: VitalSchema
});

export const VitalsListResponseSchema = Type.Object({
  data: Type.Array(VitalSchema)
});

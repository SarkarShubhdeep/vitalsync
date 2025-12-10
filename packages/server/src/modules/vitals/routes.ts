import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { CreateVitalSchema, VitalsListResponseSchema, VitalResponseSchema } from './schema';
import { VitalModel } from './model';

export const vitalsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post('/', {
    schema: {
      body: CreateVitalSchema,
      response: {
        201: VitalResponseSchema
      },
      tags: ['Vitals']
    }
  }, async (request, reply) => {
    const vital = new VitalModel(request.body);
    await vital.save();
    return reply.code(201).send({ data: { ...vital.toObject(), _id: vital._id.toString(), timestamp: vital.timestamp.toISOString() } });
  });

  fastify.get('/', {
    schema: {
      response: {
        200: VitalsListResponseSchema
      },
      tags: ['Vitals']
    }
  }, async (request, reply) => {
    const vitals = await VitalModel.find().sort({ timestamp: -1 });
    return { 
      data: vitals.map(v => ({
        ...v.toObject(),
        _id: v._id.toString(),
        timestamp: v.timestamp.toISOString()
      })) 
    };
  });
};

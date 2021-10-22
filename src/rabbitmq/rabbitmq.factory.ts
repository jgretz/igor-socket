import {INestApplication} from '@nestjs/common';
import {
  ClientOptions,
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

export const rabbitMqConfig = (): ClientOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBIT_URL],
    queue: process.env.RABBIT_QUEUE,
    noAck: false,
    queueOptions: {
      durable: true,
    },
  },
});

export const createRabbitMqClientProxy = () => {
  return ClientProxyFactory.create(rabbitMqConfig());
};

export const createRabbitMqMicroservice = async (app: INestApplication): Promise<void> => {
  await app.connectMicroservice<MicroserviceOptions>(rabbitMqConfig());
};

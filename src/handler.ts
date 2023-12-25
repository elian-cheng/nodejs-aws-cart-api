import { NestFactory } from '@nestjs/core';
import { Context, Handler, Callback } from 'aws-lambda';
import { configure as serverlessExpress } from '@vendia/serverless-express';

import helmet from 'helmet';

import { AppModule } from './app.module';

const origWarning = process.emitWarning;

process.emitWarning = function (...args) {
  const error = new Error();
  console.warn(`Warning: ${args[1]}\n${error.stack}`);
  return origWarning.apply(process, args);
};

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // process.exit(1);
});

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });

  app.use(helmet());
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  console.log('event', event);
  return server(event, context, callback);
};

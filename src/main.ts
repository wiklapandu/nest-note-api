import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // snapshot: true,
    logger: WinstonModule.createLogger({
      transports: [
        new transports.File({
          filename: `logs/debug.log`,
          format: format.combine(format.timestamp(), format.json()),
        }),
      ],
    }),
    cors: {
      origin: ['http://localhost:3001'],
    },
  });
  await app.listen(3000);
}
bootstrap();

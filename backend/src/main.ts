import { logger } from './common/middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(logger);

  await app.listen(process.env.PORT || 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

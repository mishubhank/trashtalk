import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // CRITICAL: Must be true!
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true, // This helps too
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

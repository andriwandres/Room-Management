import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  });

  const options = new DocumentBuilder()
    .setTitle('Room Management API')
    .setDescription('API for managing room reservations')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();

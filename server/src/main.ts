import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  AUTH_SWAGGER_TAG,
  MESSAGES_SWAGGER_TAG,
  NOTIFICATIONS_SWAGGER_TAG,
  USERS_SWAGGER_TAG,
} from './Constants';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const typeorm = app.get(DataSource);

  typeorm.runMigrations();

  const options = new DocumentBuilder()
    .setTitle('Kubide technical test swagger documentation')
    .setDescription('API for the app')
    .setVersion('1.0')
    .addTag(AUTH_SWAGGER_TAG)
    .addTag(USERS_SWAGGER_TAG)
    .addTag(MESSAGES_SWAGGER_TAG)
    .addTag(NOTIFICATIONS_SWAGGER_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();

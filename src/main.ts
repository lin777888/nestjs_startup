import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import fluentLogger from 'fluent-logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (!!process.env.EFK_TAG) {
    fluentLogger.configure(`API.${process.env.EFK_TAG}`, {
      host: process.env.EFK_HOST,
      port: parseInt(process.env.EFK_PORT),
      timeout: 3.0,
      reconnectInterval: 600000, // 10 minutes
    });
  }

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Zapi Lamda Notification Service')
    .setDescription('Zummit Africa Email & Text Notification Hub')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(Number(process.env.NODE_PORT) || 3002);
}
bootstrap();

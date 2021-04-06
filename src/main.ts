import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Device Management API')
   .setDescription('Device management api')
   .setVersion('1.0.0')
   .addBearerAuth()
   .build()

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, doc);

  await app.listen(3000);
}
bootstrap();

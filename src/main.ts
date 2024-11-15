import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const apiGatewayPort = Number(process.env.API_GATEWAY_PORT);
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: apiGatewayPort
      }
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.startAllMicroservices();
  console.log("all microservices started");
  await app.listen(apiGatewayPort, () => console.log("api-gateway is listening on PORT:", apiGatewayPort));
}
bootstrap();

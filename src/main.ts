import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const AUTH_SVC_PORT = Number(process.env.AUTH_SVC_PORT);
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: AUTH_SVC_PORT
      }
    }
  );
  await app.listen();
  console.log("auth service is listening on PORT:", AUTH_SVC_PORT);
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './controller/api-gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SVC',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.AUTH_SVC_PORT)
        }
      },
      {
        name: 'POST_SVC',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.POST_SVC_PORT)
        }
      },
      {
        name: 'USER_SVC',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: Number(process.env.USER_SVC_PORT)
        }
      }
    ])
  ],
  controllers: [AppController, ApiGatewayController],
  providers: [AppService],
})
export class AppModule {}


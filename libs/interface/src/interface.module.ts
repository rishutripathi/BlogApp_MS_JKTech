import { Module } from '@nestjs/common';
import { InterfaceService } from './interface.service';

@Module({
  providers: [InterfaceService],
  exports: [InterfaceService],
})
export class InterfaceModule {}

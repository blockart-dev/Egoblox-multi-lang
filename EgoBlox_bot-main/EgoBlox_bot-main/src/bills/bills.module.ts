import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}

import { Module } from '@nestjs/common';
import { ContractInteractionService } from './contract-interaction.service';

@Module({
  exports: [ContractInteractionService],
  providers: [ContractInteractionService],
})
export class ContractInteractionModule {}

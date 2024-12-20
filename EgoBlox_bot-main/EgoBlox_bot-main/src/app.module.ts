import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BotModule } from './bot/bot.module';
import { WalletModule } from './wallet/wallet.module';
import { BillsModule } from './bills/bills.module';
import { ContractInteractionModule } from './paymaster-contract-interaction/contract-interaction.module';

@Module({
  imports: [
    DatabaseModule,
    BotModule,
    WalletModule,
    BillsModule,
    ContractInteractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

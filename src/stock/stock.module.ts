import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AlphavantageService } from './service/alphavantage.service';
import { StockResolver } from './stock.resolver';

@Module({
  imports: [HttpModule],
  providers: [
    StockResolver,
    {
      provide: 'StockServiceInterface',
      useClass: AlphavantageService,
    },
  ],
})
export class StockModule {}

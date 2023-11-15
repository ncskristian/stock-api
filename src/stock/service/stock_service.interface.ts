import { DailyArgs } from '../dto/args/daily.args';
import { DailyAdjustedArgs } from '../dto/args/daily_adjusted.args';
import { IntradayArgs } from '../dto/args/intra_day.args';
import { MonthlyArgs } from '../dto/args/monthly.args';
import { MonthlyAdjustedArgs } from '../dto/args/monthly_adjusted.args';
import { QuoteArgs } from '../dto/args/quote.args';
import { TickerSearchArgs } from '../dto/args/ticker_search.args';
import { WeeklyAdjustedArgs } from '../dto/args/weekly_adjusted.args';
import { WeeklyArgs } from '../dto/args/weeky.args';
import { EquityEntity } from '../entity/equity_data';
import { MarketStatusEntity } from '../entity/market_status';
import { MetadataEntity } from '../entity/metadata';
import { QuoteEntity } from '../entity/quote';
import { TickerSearchEntity } from '../entity/ticker_search';

export interface StockService {
  getIntradayStockData: (
    args: IntradayArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getDailyStockData: (
    args: DailyArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getDailyAdjustedStockData: (
    args: DailyAdjustedArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getWeeklyStockData: (
    args: WeeklyArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getWeeklyAdjustedStockData: (
    args: WeeklyAdjustedArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getMonthlyStockData: (
    args: MonthlyArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getMonthlyAdjustedStockData: (
    args: MonthlyAdjustedArgs,
  ) => Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }>;

  getQuoteEndpoint: (args: QuoteArgs) => Promise<QuoteEntity>;

  getTickerSearch: (args: TickerSearchArgs) => Promise<TickerSearchEntity[]>;

  getMarketStatus: () => Promise<MarketStatusEntity[]>;
}

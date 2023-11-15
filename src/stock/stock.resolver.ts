import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { DailyArgs } from './dto/args/daily.args';
import { DailyAdjustedArgs } from './dto/args/daily_adjusted.args';
import { IntradayArgs } from './dto/args/intra_day.args';
import { MonthlyArgs } from './dto/args/monthly.args';
import { MonthlyAdjustedArgs } from './dto/args/monthly_adjusted.args';
import { QuoteArgs } from './dto/args/quote.args';
import { TickerSearchArgs } from './dto/args/ticker_search.args';
import { WeeklyAdjustedArgs } from './dto/args/weekly_adjusted.args';
import { WeeklyArgs } from './dto/args/weeky.args';
import { GlobalQuoteResponse } from './dto/responses/global_quote_response';
import { MarketStatusResponse } from './dto/responses/market_status_response';
import { TickerSearchResponse } from './dto/responses/ticker_search_response';
import { TimeSeriesDataResponse } from './dto/responses/time_series_response';
import { EquityEntity } from './entity/equity_data';
import { MetadataEntity } from './entity/metadata';
import { StockService } from './service/stock_service.interface';

@Resolver(() => TimeSeriesDataResponse)
export class StockResolver {
  constructor(
    @Inject('StockServiceInterface')
    private readonly stockService: StockService,
  ) {}

  @Query(() => TimeSeriesDataResponse)
  async getIntradayData(@Args() args: IntradayArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getIntradayStockData(args),
    );
  }

  @Query(() => TimeSeriesDataResponse)
  async getDailyData(@Args() args: DailyArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getDailyStockData(args),
    );
  }

  @Query(() => TimeSeriesDataResponse)
  async getDailyAdjustedData(@Args() args: DailyAdjustedArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getDailyAdjustedStockData(args),
    );
  }

  @Query(() => TimeSeriesDataResponse)
  async getWeeklyData(@Args() args: WeeklyArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getWeeklyStockData(args),
    );
  }

  @Query(() => TimeSeriesDataResponse)
  async getWeeklyAdjustedData(@Args() args: WeeklyAdjustedArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getWeeklyAdjustedStockData(args),
    );
  }

  @Query(() => TimeSeriesDataResponse)
  async getMonthlyData(@Args() args: MonthlyArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getMonthlyStockData(args),
    );
  }

  @Query(() => TimeSeriesDataResponse)
  async getMonthlyAdjustedData(@Args() args: MonthlyAdjustedArgs) {
    return this.mappingStockEntitiesToResponse(
      await this.stockService.getMonthlyAdjustedStockData(args),
    );
  }

  @Query(() => GlobalQuoteResponse)
  getGlobalQuote(@Args() args: QuoteArgs) {
    return this.stockService.getQuoteEndpoint(args);
  }

  @Query(() => [MarketStatusResponse!]!)
  getMarketStatus() {
    return this.stockService.getMarketStatus();
  }

  @Query(() => [TickerSearchResponse!]!)
  getTickerSearch(
    @Args() args: TickerSearchArgs,
  ): Promise<TickerSearchResponse[]> {
    return this.stockService.getTickerSearch(args);
  }

  private mappingStockEntitiesToResponse({
    metadata,
    equities,
  }: {
    metadata: MetadataEntity;
    equities: EquityEntity[];
  }): TimeSeriesDataResponse {
    return {
      metadata: {
        ...metadata,
        lastRefreshed: metadata.lastRefreshed.toString(),
      },
      series: equities,
    };
  }
}

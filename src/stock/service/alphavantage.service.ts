import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { DailyArgs } from '../dto/args/daily.args';
import { DailyAdjustedArgs } from '../dto/args/daily_adjusted.args';
import { IntradayArgs } from '../dto/args/intra_day.args';
import { MonthlyArgs } from '../dto/args/monthly.args';
import { MonthlyAdjustedArgs } from '../dto/args/monthly_adjusted.args';
import { QuoteArgs } from '../dto/args/quote.args';
import { TickerSearchArgs } from '../dto/args/ticker_search.args';
import { TimeSeriesFunction } from '../dto/args/time_series_function';
import { TimeSeriesInterval } from '../dto/args/time_series_interval';
import { WeeklyAdjustedArgs } from '../dto/args/weekly_adjusted.args';
import { WeeklyArgs } from '../dto/args/weeky.args';
import { EquityEntity } from '../entity/equity_data';
import { MarketStatusEntity } from '../entity/market_status';
import { MetadataEntity } from '../entity/metadata';
import { QuoteEntity } from '../entity/quote';
import { TickerSearchEntity } from '../entity/ticker_search';
import { StockService } from './stock_service.interface';

@Injectable()
export class AlphavantageService implements StockService {
  readonly BASE_URL = 'https://www.alphavantage.co/query';
  readonly apiKey = process.env.API_KEY;

  constructor(private readonly httpService: HttpService) {}

  getQuoteEndpoint(args: QuoteArgs): Promise<QuoteEntity> {
    return firstValueFrom(
      this.httpService
        .get(this.BASE_URL, {
          params: {
            ...args,
            apikey: this.apiKey,
            function: TimeSeriesFunction.GLOBAL_QUOTE,
          },
        })
        .pipe(
          map((res) => {
            const globalQuote = res.data['Global Quote'];
            return {
              symbol: this.findValueByName(globalQuote, 'symbol'),
              open: this.findValueByName(globalQuote, 'open'),
              high: this.findValueByName(globalQuote, 'high'),
              low: this.findValueByName(globalQuote, 'low'),
              price: this.findValueByName(globalQuote, 'price'),
              volume: this.findValueByName(globalQuote, 'volume'),
              latestTradingDay: this.findValueByName(
                globalQuote,
                'latest trading day',
              ),
              change: this.findValueByName(globalQuote, 'change'),
              previousClose: this.findValueByName(
                globalQuote,
                'previous close',
              ),
              changePercent: this.findValueByName(
                globalQuote,
                'change percent',
              ),
            };
          }),
        ),
    );
  }
  getTickerSearch(args: TickerSearchArgs): Promise<TickerSearchEntity[]> {
    return firstValueFrom(
      this.httpService
        .get(this.BASE_URL, {
          params: {
            ...args,
            apikey: this.apiKey,
            function: TimeSeriesFunction.SYMBOL_SEARCH,
          },
        })
        .pipe(
          map((res) =>
            res.data['bestMatches'].map((match) => ({
              symbol: this.findValueByName(match, 'symbol'),
              name: this.findValueByName(match, 'name'),
              type: this.findValueByName(match, 'type'),
              region: this.findValueByName(match, 'region'),
              marketOpen: this.findValueByName(match, 'marketOpen'),
              marketClose: this.findValueByName(match, 'marketClose'),
              timezone: this.findValueByName(match, 'timezone'),
              currency: this.findValueByName(match, 'currency'),
              matchScore: this.findValueByName(match, 'matchScore'),
            })),
          ),
        ),
    );
  }

  getMarketStatus(): Promise<MarketStatusEntity[]> {
    return firstValueFrom(
      this.httpService
        .get(this.BASE_URL, {
          params: {
            apikey: this.apiKey,
            function: TimeSeriesFunction.MARKET_STATUS,
          },
        })
        .pipe(
          map((res) =>
            res.data['markets'].map((match) => ({
              marketType: this.findValueByName(match, 'market_type'),
              region: this.findValueByName(match, 'region'),
              primaryExchanges: this.findValueByName(
                match,
                'primary_exchanges',
              ),
              localOpen: this.findValueByName(match, 'local_open'),
              localClose: this.findValueByName(match, 'local_close'),
              currentStatus: this.findValueByName(match, 'current_status'),
              notes: this.findValueByName(match, 'notes'),
            })),
          ),
        ),
    );
  }

  getIntradayStockData(
    args: IntradayArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(TimeSeriesFunction.TIME_SERIES_INTRADAY, args);
  }

  getDailyStockData(
    args: DailyArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(TimeSeriesFunction.TIME_SERIES_DAILY, args);
  }

  getDailyAdjustedStockData(
    args: DailyAdjustedArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(
      TimeSeriesFunction.TIME_SERIES_DAILY_ADJUSTED,
      args,
    );
  }

  getWeeklyStockData(
    args: WeeklyArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(TimeSeriesFunction.TIME_SERIES_WEEKLY, args);
  }

  getWeeklyAdjustedStockData(
    args: WeeklyAdjustedArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(
      TimeSeriesFunction.TIME_SERIES_WEEKLY_ADJUSTED,
      args,
    );
  }

  getMonthlyStockData(
    args: MonthlyArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(TimeSeriesFunction.TIME_SERIES_MONTHLY, args);
  }

  getMonthlyAdjustedStockData(
    args: MonthlyAdjustedArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    return this.getStockData(
      TimeSeriesFunction.TIME_SERIES_MONTHLY_ADJUSTED,
      args,
    );
  }

  private getStockData(
    timeSeriesFunction: TimeSeriesFunction,
    args:
      | IntradayArgs
      | DailyArgs
      | DailyAdjustedArgs
      | WeeklyArgs
      | WeeklyAdjustedArgs
      | MonthlyArgs
      | MonthlyAdjustedArgs,
  ): Promise<{ metadata: MetadataEntity; equities: EquityEntity[] }> {
    const params = {
      ...args,
      function: timeSeriesFunction.toString(),
      apikey: this.apiKey,
    };

    if ('extendedHours' in args) {
      params['extended_hours'] = args.extendedHours;
    }

    return firstValueFrom(
      this.httpService
        .get<Record<string, unknown>>(this.BASE_URL, {
          params,
        })
        .pipe(
          map((res) => {
            const metadataResponse = res.data['Meta Data'] as Record<
              string,
              string
            >;
            const metadata: MetadataEntity = {
              information: this.findValueByName(
                metadataResponse,
                'information',
              ),
              symbol: this.findValueByName(metadataResponse, 'symbol'),
              lastRefreshed: this.findValueByName(
                metadataResponse,
                'last refreshed',
              ),
              interval: this.findValueByName(metadataResponse, 'interval'),
              outputSize: this.findValueByName(metadataResponse, 'output size'),
              timeZone: this.findValueByName(metadataResponse, 'time zone'),
            };

            const equitiesResponses =
              res?.data[
                this.getTimeSeriesPropertyKey(
                  timeSeriesFunction,
                  'interval' in args ? args.interval : null,
                )
              ];
            const equities: EquityEntity[] = Object.entries(
              equitiesResponses,
            ).map(([key, item]) => ({
              open: item['1. open'],
              hight: item['2. high'],
              low: item['3. low'],
              close: item['4. close'],
              volume: item['5. volume'],
              time: key,
            }));

            return { metadata, equities };
          }),
        ),
    );
  }

  /**
   *
   * get correct property key from API response based on interval and function type
   * @param timeSeriesFunction
   * @param interval
   * @returns
   */
  private getTimeSeriesPropertyKey(
    timeSeriesFunction: TimeSeriesFunction,
    interval?: TimeSeriesInterval,
  ) {
    if (interval != null) {
      return `Time Series (${interval.toString()})`;
    }

    switch (timeSeriesFunction) {
      case TimeSeriesFunction.TIME_SERIES_DAILY:
      case TimeSeriesFunction.TIME_SERIES_DAILY_ADJUSTED:
        return 'Time Series (Daily)';

      case TimeSeriesFunction.TIME_SERIES_WEEKLY:
      case TimeSeriesFunction.TIME_SERIES_WEEKLY_ADJUSTED:
        return 'Weekly Time Series';

      case TimeSeriesFunction.TIME_SERIES_MONTHLY:
      case TimeSeriesFunction.TIME_SERIES_MONTHLY_ADJUSTED:
        return 'Monthly Time Series';
    }
  }

  /**
   * get value whose property name contains the parameter "key"
   * @param metadata
   * @param key
   * @returns string
   */
  private findValueByName(metadata: Record<string, string>, key: string) {
    const entries = Object.entries(metadata);
    return entries.find(([name]) =>
      name.toLowerCase().includes(key.toLowerCase()),
    )?.[1];
  }
}

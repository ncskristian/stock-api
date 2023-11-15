import { registerEnumType } from '@nestjs/graphql';

export enum TimeSeriesFunction {
  TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY',
  TIME_SERIES_DAILY = 'TIME_SERIES_DAILY',
  TIME_SERIES_DAILY_ADJUSTED = 'TIME_SERIES_DAILY_ADJUSTED',
  TIME_SERIES_WEEKLY = 'TIME_SERIES_WEEKLY',
  TIME_SERIES_WEEKLY_ADJUSTED = 'TIME_SERIES_WEEKLY_ADJUSTED',
  TIME_SERIES_MONTHLY = 'TIME_SERIES_MONTHLY',
  TIME_SERIES_MONTHLY_ADJUSTED = 'TIME_SERIES_MONTHLY_ADJUSTED',
  MARKET_STATUS = 'MARKET_STATUS',
  SYMBOL_SEARCH = 'SYMBOL_SEARCH',
  GLOBAL_QUOTE = 'GLOBAL_QUOTE',
}

registerEnumType(TimeSeriesFunction, { name: 'TimeSeriesFunction' });

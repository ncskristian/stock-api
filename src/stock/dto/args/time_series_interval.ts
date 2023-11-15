import { registerEnumType } from '@nestjs/graphql';

export enum TimeSeriesInterval {
  ONE_MINUTE = '1min',
  FIVE_MINUTES = '5min',
  FIFTEEN_MINUTES = '15min',
  THIRTY_MINUTES = '30min',
  ONE_HOUR = '60min',
}

registerEnumType(TimeSeriesInterval, { name: 'TimeSeriesInterval' });

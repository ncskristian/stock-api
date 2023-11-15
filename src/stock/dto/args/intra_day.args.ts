import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';
import { OutputSize } from './output_size';
import { TimeSeriesInterval } from './time_series_interval';

@ArgsType()
export class IntradayArgs {
  @Field()
  symbol: string;

  @Field(() => TimeSeriesInterval)
  interval: TimeSeriesInterval;

  @Field({ nullable: true })
  adjusted?: boolean;

  @Field({ nullable: true })
  extendedHours?: boolean;

  @Field({ nullable: true })
  //TODO: format YYYY-MM
  month?: string;

  @Field(() => OutputSize, { nullable: true })
  outputSize?: OutputSize;

  @Field(() => DataTypes, { nullable: true })
  dataType?: DataTypes;
}

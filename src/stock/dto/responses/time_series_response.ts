import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TimeSeriesMetadata {
  @Field()
  information: string;

  @Field()
  symbol: string;

  @Field()
  lastRefreshed: string;

  @Field({ nullable: true })
  outputSize: string;

  @Field()
  timeZone: string;
}

@ObjectType()
export class EquityData {
  @Field()
  open: number;
  @Field()
  hight: number;
  @Field()
  low: number;
  @Field()
  close: number;
  @Field({ nullable: true })
  adjustedClose?: number;
  @Field()
  volume: number;
  @Field({ nullable: true })
  dividendAmount?: number;
  @Field({ nullable: true })
  splitCoefficient?: number;
  @Field()
  time: string;
}

@ObjectType()
export class TimeSeriesDataResponse {
  @Field(() => TimeSeriesMetadata)
  metadata: TimeSeriesMetadata;

  @Field(() => [EquityData!]!)
  series: EquityData[];
}

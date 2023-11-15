import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GlobalQuoteResponse {
  @Field()
  symbol: string;

  @Field()
  open: string;

  @Field()
  high: string;

  @Field()
  low: string;

  @Field()
  price: string;

  @Field()
  volume: string;

  @Field()
  latestTradingDay: string;

  @Field()
  previousClose: string;

  @Field()
  change: string;

  @Field()
  changePercent: string;
}

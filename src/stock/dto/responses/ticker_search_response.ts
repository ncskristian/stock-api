import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TickerSearchResponse {
  @Field()
  symbol: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  region: string;

  @Field()
  marketOpen: string;

  @Field()
  marketClose: string;

  @Field()
  timezone: string;

  @Field()
  currency: string;

  @Field()
  matchScore: string;
}

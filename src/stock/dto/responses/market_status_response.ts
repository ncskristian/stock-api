import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MarketStatusResponse {
  @Field()
  marketType: string;

  @Field()
  region: string;

  @Field()
  primaryExchanges: string;

  @Field()
  localOpen: string;

  @Field()
  localClose: string;

  @Field()
  currentStatus: string;

  @Field()
  notes: string;
}

import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';

@ArgsType()
export class QuoteArgs {
  @Field()
  symbol: string;

  @Field(() => DataTypes)
  dataType?: DataTypes;
}

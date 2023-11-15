import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';

@ArgsType()
export class MonthlyAdjustedArgs {
  @Field()
  symbol: string;

  @Field(() => DataTypes)
  dataType?: DataTypes;
}

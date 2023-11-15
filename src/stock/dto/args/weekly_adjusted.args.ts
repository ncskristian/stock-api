import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';

@ArgsType()
export class WeeklyAdjustedArgs {
  @Field()
  symbol: string;

  @Field(() => DataTypes)
  dataType?: DataTypes;
}

import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';

@ArgsType()
export class WeeklyArgs {
  @Field()
  symbol: string;

  @Field(() => DataTypes)
  dataType?: DataTypes;
}

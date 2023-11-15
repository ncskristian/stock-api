import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';

@ArgsType()
export class TickerSearchArgs {
  @Field()
  keywords: string;

  @Field(() => DataTypes)
  dataType?: DataTypes;
}

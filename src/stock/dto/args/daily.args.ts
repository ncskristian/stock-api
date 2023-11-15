import { ArgsType, Field } from '@nestjs/graphql';
import { DataTypes } from './data_types';
import { OutputSize } from './output_size';

@ArgsType()
export class DailyArgs {
  @Field()
  symbol: string;

  @Field(() => OutputSize)
  outputSize?: OutputSize;

  @Field(() => DataTypes)
  dataType?: DataTypes;
}

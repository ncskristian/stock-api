import { registerEnumType } from '@nestjs/graphql';

export enum DataTypes {
  JSON = 'json',
  CSV = 'csv',
}

registerEnumType(DataTypes, { name: 'DataTypes' });

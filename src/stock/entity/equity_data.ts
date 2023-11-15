export interface EquityEntity {
  open: number;
  hight: number;
  low: number;
  close: number;
  adjustedClose?: number;
  volume: number;
  dividendAmount?: number;
  splitCoefficient?: number;
  time: string;
}

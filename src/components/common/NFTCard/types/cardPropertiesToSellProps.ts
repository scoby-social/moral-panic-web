export interface CardPropertiesToSellProps {
  amount: number;
  quota: number;
  units: number;
  price: number;
  volume: number;
  fullScreen?: boolean;
  handleChangeUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

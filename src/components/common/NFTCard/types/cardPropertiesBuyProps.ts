export interface CardPropertiesBuyProps {
  amount: number;
  quota: number;
  units: number;
  fullScreen: boolean;
  handleChangeUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

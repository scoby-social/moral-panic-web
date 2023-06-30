export interface CardPropertiesBuyProps {
  amount: number;
  quota: number;
  units: number;
  handleChanceUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

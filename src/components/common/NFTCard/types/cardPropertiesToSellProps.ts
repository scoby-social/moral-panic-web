export interface CardPropertiesToSellProps {
    amount: number;
    quota: number;
    units: number;
    price: number;
    volume: number;
    handleChanceUnits: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
  }
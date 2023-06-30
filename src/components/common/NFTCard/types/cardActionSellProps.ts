import { NotificationMessage } from "./notificationsMessage";

export interface CardActionSellProps {
    amount: number;
    quota: number;
    price: number;
    units: number;
    volume: number;
    transactionDisabled: boolean;
    actionDisabled: boolean;
    transaccionMessage: NotificationMessage;
    handleClickSell: () => Promise<void>;
    handleChanceUnits: (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
  }
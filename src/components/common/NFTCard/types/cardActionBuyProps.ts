import { NotificationMessage } from "./notificationsMessage";

export interface CardActionBuyProps {
  amount: number;
  quota: number;
  price: number;
  units: number;
  transactionDisabled: boolean;
  actionDisabled: boolean;
  transaccionMessage: NotificationMessage;
  handleClickBuy: () => Promise<void>;
  handleChanceUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
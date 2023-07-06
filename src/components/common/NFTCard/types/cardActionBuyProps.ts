import { NotificationMessage } from "./notificationsMessage";

export interface CardActionBuyProps {
  amount: number;
  quota: number;
  price: number;
  units: number;
  transactionDisabled: boolean;
  actionDisabled: boolean;
  transaccionMessage: NotificationMessage;
  fullScreen?: boolean;
  handleClickBuy: () => Promise<void>;
  handleChangeUnits: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

import {
  NotificationMessage,
  messageType,
} from "../types/notificationsMessage";

const notificationMessage = (type: messageType) => {
  if (type === messageType.buySuccess) {
    return "Congrats! You have bought a token successfully";
  }

  if (type === messageType.sellSuccess) {
    return "Congrats! You have list a token successfully";
  }

  if (type === messageType.insufficientBalance) {
    return `
      "Hey! We checked your wallet and you don't have enough crypto to buy.
      Come back later when you've earned some bread and try again."
      `;
  }

  if (type === messageType.unknow) {
    return "I dunno why, but the machines elves f*cked up your trade, Try again later.";
  }

  if (type === messageType.limitQuota) {
    return "Sorry pal, you can’t list more of these tokens until 2 of the ones you minted have been used and burned.";
  }

  if (type === messageType.buyLimit) {
    return "Hey pal, looks like you already have a Wooden Nickel. I’d love to sell you another but you should figure out how to mint your own.";
  }

  if (type === messageType.hasFakeId) {
    return "Hey pal, looks like you already have a Fake ID. I’d love to sell you a Wooden Nickel, but you can mint your own cheaper.";
  }

  if (type === messageType.insufficientTokenBalance) {
    return `
    "Hey! We checked your wallet and you don't have enough crypto to sell.
    Come back later when you've earned some bread and try again."
    `;
  }

  return "";
};

export const getNotificacionMessage = (
  type: messageType
): NotificationMessage => {
  return {
    type: type,
    msg: notificationMessage(type),
  };
};

export interface NFTCardProps {
    name: string;
    symbol: string;
    description: string;
    image: string;
    external_url: string;
    minter: string;
    seniority: string;
    price: number;
    type?: 'sell' | 'buy';
    amount: number;
    volume?: number;
    quota: number;
    transactionDisabled?: boolean;
    handleTransaction: (amount: number) => Promise<Boolean | undefined>
}

export interface NotificationMessage {
    type: messageType,
    msg: string,
}

export enum messageType {
    idle = 'idle',
    buySuccess = 'buySuccess',
    sellSuccess = 'sellSuccess',
    insufficientBalance = 'insufficient balance',
    unknow = 'unknow',
    limitQuota = 'limitQuota',
    buyLimit = 'buyLimit'

}
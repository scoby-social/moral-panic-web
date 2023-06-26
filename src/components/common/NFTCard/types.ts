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
    handleTransaction: () => Promise<Boolean>
}

export interface NotificationMessage {
    type: messageType,
    msg: string,
}

export enum messageType {
    idle = 'idle',
    success = 'success',
    insufficientBalance = 'insufficient balance',
    unknow = 'unknow'

}
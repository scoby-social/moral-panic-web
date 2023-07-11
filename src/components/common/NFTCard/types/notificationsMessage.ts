
export interface NotificationMessage {
    type: messageType,
    msg: string,
}

export enum messageType {
    idle = 'idle',
    buySuccess = 'buySuccess',
    sellSuccess = 'sellSuccess',
    insufficientBalance = 'insufficient balance',
    insufficientTokenBalance = 'insufficient tokenBalance balance',
    unknow = 'unknow',
    limitQuota = 'limitQuota',
    buyLimit = 'buyLimit',
    hasFakeId = 'hasFakeId',

}
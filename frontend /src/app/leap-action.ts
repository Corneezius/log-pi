export interface LeapAction {
    action: string;
    close?: boolean;
    openExternal?:boolean;
    transactionType?:string;
    transactionId?:string;
    matterId?:string;
    ledgersToReload?:number[];
    url?:string;
}

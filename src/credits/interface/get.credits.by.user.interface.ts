export interface IGetCreditsByUser {
    userId: number;
    credits: ICredits[]
}

export interface ICredits {
    id: number;
    amount: number;
    status: number;
    createdAt: Date;
}

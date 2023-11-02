export interface ICreateCreditResponse {
    creditId: number;
    installments: {
        id: number;
        dueDate: string;
        amount: number;
    }[];
}
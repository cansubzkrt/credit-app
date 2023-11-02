import { CreditStatus } from "../enum/credit.enum";

export interface ICreateCreditInput {
  userId: number;
  amount: number;
  installment: number;
  status: CreditStatus;
}

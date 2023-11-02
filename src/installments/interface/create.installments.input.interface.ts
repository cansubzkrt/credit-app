import { InstallmentStatus } from "../enum/installment.status.enum";

export interface ICreateInstallmentsInput {
  creditId: number;
  amount: number;
  status: InstallmentStatus;
  dueDate: Date;
}

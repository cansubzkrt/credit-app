import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Installments } from './entites/installments.entity';
import { Repository } from 'typeorm';
import { ICreateInstallmentsInput } from './interface/create.installments.input.interface';
import { InstallmentStatus } from './enum/installment.status.enum';
import { PaymentInstallmentDto } from './dto/payment.dto';
import { IGetInstallmentByUser } from './interface/get.installment.by.user.interface';

@Injectable()
export class InstallmentsService {
    constructor(
        @InjectRepository(Installments)
        private installmentRepository: Repository<Installments>
    ) { }

    /**
     * Create credit installments.
     *
     * @param createInstallments 
     * @returns 
     */
    async createInstallments(createInstallments: ICreateInstallmentsInput) {
        return this.installmentRepository.save(createInstallments);
    }

    /**
     * Get installment by userId.
     * 
     * @param userId 
     * @param installmentId 
     * @returns 
     */
    async getInstallmentByUser(userId: number, installmentId: number): Promise<IGetInstallmentByUser> {
        return await this.installmentRepository
            .createQueryBuilder("installments")
            .innerJoinAndSelect("installments.credit", "credits")
            .innerJoinAndSelect("credits.user", "users")
            .where("installments.id = :installmentId", { installmentId })
            .andWhere("users.id = :userId", { userId })
            .getOne();
    }

    /**
     * Pay the installment
     * 
     * @param userId 
     * @param paymentDto 
     * @returns 
     */
    async payInstallment(userId: number, paymentDto: PaymentInstallmentDto): Promise<any> {
        try {
            const { installmentId, amount } = paymentDto;
            const installment = await this.getInstallmentByUser(userId, installmentId);

            if (installment) {
                // Check whether the installment amount has been paid
                if (installment.status !== InstallmentStatus.PAID) {

                    // Check if the payment amount is greater than 0
                    if (amount > 0) {
                        if (amount < installment.amount) {
                            const newAmount = Number((installment.amount - amount).toFixed(2));

                            await this.installmentRepository.update(installmentId, { amount: newAmount });
                        } else {
                            // If the payment amount is equal to or more than the installment amount
                            // Don't forget to take action for overpayment
                            await this.installmentRepository.update(installmentId, { amount: 0, status: InstallmentStatus.PAID });
                        }
                        return { message: 'Payment successful' };
                    }
                    throw new BadRequestException('Payment amount cannot be negative')
                }
                throw new BadRequestException('Installment is already paid');
            }
            throw new NotFoundException('Installment not found');
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Installments } from '../installments/entites/installments.entity';
import { UsersService } from '../users/users.service';
import { Credits } from './entities/credits.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCreditDto } from './dto/create.credit.dto';
import { ICreateCreditInput } from './interface/create.credit.input.interface';
import { InstallmentsService } from '../installments/installments.service';
import { ICreateCreditResponse } from './interface/create.credit.output.interface';
import { ICreateInstallmentsInput } from '../installments/interface/create.installments.input.interface';
import { CreditStatus } from './enum/credit.enum';
import { InstallmentStatus } from '../installments/enum/installment.status.enum';
import { getNextInstallmentDate } from '../helper';
import { ICredits, IGetCreditsByUser } from './interface/get.credits.by.user.interface';

@Injectable()
export class CreditsService {
    constructor(
        @InjectRepository(Credits)
        private creditRepository: Repository<Credits>,
        private readonly userService: UsersService,
        private readonly installmentService: InstallmentsService,
    ) { }

    /**
     * Create credit.
     * 
     * @param createCreditDto 
     * @returns 
     */
    async createCredit(createCreditDto: CreateCreditDto): Promise<ICreateCreditResponse> {
        try {
            const { userId, amount, installment } = createCreditDto;
            const user = await this.userService.get(userId);

            // check if there are user
            if (user) {
                const creditInput: ICreateCreditInput = {
                    userId,
                    amount,
                    installment,
                    status: CreditStatus.APPROVED
                }
                const savedCredit = await this.creditRepository.save(creditInput);

                const installmentAmount = parseFloat((amount / installment).toFixed(2));
                let remainingAmount = amount;
                let currentDate = new Date();

                const installments = [];

                // create installments
                for (let i = 0; i < installment; i++) {

                    currentDate = getNextInstallmentDate(currentDate); // to pass on weekends

                    const createInstallment: ICreateInstallmentsInput = {
                        creditId: savedCredit.id,
                        status: InstallmentStatus.UNPAID,
                        amount: i === installment - 1 ? remainingAmount : installmentAmount,
                        dueDate: new Date(currentDate.toISOString().split('T')[0]),
                    }

                    // saved installment
                    const savedInstallment = await this.installmentService.createInstallments(createInstallment);

                    installments.push({
                        id: savedInstallment.id,
                        dueDate: currentDate.toISOString().split('T')[0],
                        amount: createInstallment.amount
                    });

                    remainingAmount -= installmentAmount;  // reduce remaining amount
                }

                return {
                    creditId: savedCredit.id,
                    installments
                };
            }
            throw new NotFoundException('User not found');
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }

    /**
     * List all credits by user.
     * 
     * @param userId 
     * @returns 
     */
    async getCreditsByUser(userId: number): Promise<IGetCreditsByUser> {
        try {
            const user = await this.userService.get(userId);

            if (user) {
                const allCredits = await this.creditRepository.find({ where: { userId } });

                return {
                    userId,
                    credits: allCredits.map(credit => ({
                        id: credit.id,
                        amount: credit.amount,
                        status: credit.status,
                        createdAt: credit.createdAt
                    }))
                }
            }
            throw new NotFoundException('User not found');
        } catch (e) {
            if (e.status && e.status != 500) {
                throw e;
            }
            throw new InternalServerErrorException(e.message || e);
        }
    }
}

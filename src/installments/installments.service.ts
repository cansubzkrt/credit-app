import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Installments } from './entites/installments.entity';
import { Repository } from 'typeorm';
import { ICreateInstallmentsInput } from './interface/create.installments.input.interface';

@Injectable()
export class InstallmentsService {
    constructor(
        @InjectRepository(Installments)
        private installmentRepository: Repository<Installments>
    ) {}

    async createInstallments(createInstallments: ICreateInstallmentsInput) {
        return this.installmentRepository.save(createInstallments);
    }
}

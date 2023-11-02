import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreateCreditDto } from './dto/create.credit.dto';
import { ICreateCreditResponse } from './interface/create.credit.output.interface';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('credits')
export class CreditsController {
    constructor(private readonly creditService: CreditsService) { }

    @ApiBadRequestResponse({ status: 400, description: 'When request body validation fails.' })
    @Post()
    async create(@Body() createCreditDto: CreateCreditDto): Promise<ICreateCreditResponse> {
        return await this.creditService.createCredit(createCreditDto);
    }
}

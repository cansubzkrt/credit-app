import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreateCreditDto } from './dto/create.credit.dto';
import { ICreateCreditResponse } from './interface/create.credit.output.interface';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('credits')
export class CreditsController {
    constructor(private readonly creditService: CreditsService) { }

    @ApiBadRequestResponse({ status: 400, description: 'When request body validation fails.' })
    @ApiNotFoundResponse({ status: 404, description: 'User not found' })
    @Post()
    async create(@Body() createCreditDto: CreateCreditDto): Promise<ICreateCreditResponse> {
        return await this.creditService.createCredit(createCreditDto);
    }

    @ApiNotFoundResponse({ status: 404, description: 'User not found' })
    @Get('/:userId')
    async getCreditsByUser(@Param('userId') userId: number) {
      return this.creditService.getCreditsByUser(userId);
    }
}

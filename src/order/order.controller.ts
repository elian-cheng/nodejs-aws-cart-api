import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from './services';
import { BasicAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async findAll() {
    const order = await this.orderService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Delete('/:id')
  async delete(@Req() req: AppRequest) {
    const order = await this.orderService.delete(req.params.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }

  @Get('/:id')
  async findById(@Req() req: AppRequest) {
    const order = await this.orderService.findById(req.params.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  async createUserOrder(@Req() req: AppRequest, @Body() body) {
    const order = await this.orderService.create(
      {
        ...body,
      },
      getUserIdFromRequest(req),
    );
  }
}

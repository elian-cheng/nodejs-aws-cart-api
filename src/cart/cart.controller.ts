import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { BasicAuthGuard } from '../auth';
import { Order, OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { calculateCartTotal } from './models-rules';
import { CartService } from './services';
import { UpdateUserCartDTO } from './dto/update-user-cart.dto';
import { CheckoutOrderDTO } from 'src/order/dto/checkout-order.dto';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(
    @Req() req: AppRequest,
    @Body() updateUserCartDTO: UpdateUserCartDTO,
  ) {
    // TODO: validate body payload...
    const cart = await this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      updateUserCartDTO,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    console.log('delete', req);
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(
    @Req() req: AppRequest,
    @Body() checkoutOrderDTO: CheckoutOrderDTO,
  ) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      throw new BadRequestException('Cart is empty');
    }

    const { id: cartId, items } = cart;
    const total = calculateCartTotal(cart);
    let order: Order;
    let cartStatus: string;
    const { comment, ...address } = checkoutOrderDTO.address;
    let trx = await this.cartService.createTransaction();

    try {
      order = await this.orderService.createTransacted(trx, {
        delivery: {
          type: 'post',
          address: { ...address },
        },
        user_id: userId,
        cart_id: cartId,
        comments: comment,
        total,
      } as any as Order);
      const [{ status }] = await this.cartService.changeCartStatusTransacted(
        trx,
        cartId,
      );
      await trx.commit();
      cartStatus = status;
    } catch (error) {
      await trx.rollback();

      throw new InternalServerErrorException(
        `Transaction failed and rolled back: ${error}`,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart_status: cartStatus,
        order: { items: items, ...order },
      },
    };
  }
}
